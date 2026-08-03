import { ApiError } from "./apiError";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8888/app";

export type ApiEnvelope<T> = { code?: number | string; message?: string; traceId?: string; result?: T };
export type ApiRequestOptions = { signal?: AbortSignal };

function unwrapEnvelope<T>(data: ApiEnvelope<T> | T): T {
  return typeof data === "object" && data !== null && "result" in data
    ? (data as ApiEnvelope<T>).result as T
    : data as T;
}

async function readJsonBody<T>(response: Response): Promise<ApiEnvelope<T> | T | undefined> {
  if (response.status === 204 || response.status === 205) return undefined;
  const text = await response.text();
  if (!text.trim()) return undefined;
  return JSON.parse(text) as ApiEnvelope<T> | T;
}

function rethrowNetworkError(method: string, path: string, error: unknown): never {
  if (error instanceof DOMException && error.name === "AbortError") throw error;
  throw new ApiError(method, path, 0, { cause: error });
}

async function handleResponse<T>(method: string, path: string, response: Response): Promise<T> {
  const data = await readJsonBody<T>(response);
  if (!response.ok) {
    const envelope = typeof data === "object" && data !== null ? data as ApiEnvelope<T> : undefined;
    throw new ApiError(method, path, response.status, {
      code: envelope?.code,
      traceId: envelope?.traceId,
      backendMessage: envelope?.message,
    });
  }
  return data === undefined ? undefined as T : unwrapEnvelope(data);
}

export async function apiGet<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      headers: { Accept: "application/json" },
      signal: options.signal,
    });
    return await handleResponse<T>("GET", path, response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    return rethrowNetworkError("GET", path, error);
  }
}

export async function apiSend<T>(
  path: string,
  method: "POST" | "PATCH" | "PUT" | "DELETE",
  body?: unknown,
  options: ApiRequestOptions = {},
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      credentials: "include",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: options.signal,
    });
    return await handleResponse<T>(method, path, response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    return rethrowNetworkError(method, path, error);
  }
}

export const apiClient = { get: apiGet, send: apiSend };
