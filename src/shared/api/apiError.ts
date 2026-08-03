export type ApiErrorCategory = "network" | "validation" | "authentication" | "permission" | "unavailable" | "server" | "unknown";

type ApiErrorDetails = {
  code?: number | string;
  traceId?: string;
  backendMessage?: string;
  cause?: unknown;
};

function categoryForStatus(status: number): ApiErrorCategory {
  if (status === 0) return "network";
  if (status === 400 || status === 409 || status === 422) return "validation";
  if (status === 401) return "authentication";
  if (status === 403) return "permission";
  if (status === 404 || status === 410) return "unavailable";
  if (status >= 500) return "server";
  return "unknown";
}

function userMessage(category: ApiErrorCategory): string {
  switch (category) {
    case "network": return "Không thể kết nối. Vui lòng kiểm tra mạng và thử lại.";
    case "validation": return "Dữ liệu chưa hợp lệ. Vui lòng kiểm tra và thử lại.";
    case "authentication": return "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";
    case "permission": return "Bạn không có quyền thực hiện thao tác này.";
    case "unavailable": return "Nội dung không còn khả dụng.";
    case "server": return "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.";
    default: return "Không thể hoàn tất thao tác. Vui lòng thử lại.";
  }
}

export class ApiError extends Error {
  readonly status: number;
  readonly path: string;
  readonly method: string;
  readonly category: ApiErrorCategory;
  readonly code?: number | string;
  readonly traceId?: string;
  readonly backendMessage?: string;

  constructor(method: string, path: string, status: number, details: ApiErrorDetails = {}) {
    const category = categoryForStatus(status);
    super(userMessage(category));
    this.name = "ApiError";
    this.method = method;
    this.status = status;
    this.path = path;
    this.category = category;
    this.code = details.code;
    this.traceId = details.traceId;
    this.backendMessage = details.backendMessage;
  }
}
