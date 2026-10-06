import { useEffect, useState } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import { AppRouter } from "./AppRouter";

const lifecycle = vi.hoisted(() => ({ mounts: 0 }));
vi.mock("../SocialApplication", () => ({ default: function Application() {
  const navigate = useNavigate();
  const [identity] = useState(() => ++lifecycle.mounts);
  useEffect(() => {}, []);
  return <><output>Instance {identity}</output><button onClick={() => navigate("/profile/u-1")}>Profile</button><button onClick={() => navigate("/post/p-1")}>Post</button></>;
} }));
afterEach(() => { cleanup(); lifecycle.mounts = 0; });

it("preserves application state and post telemetry ownership across resource routes", async () => {
  render(<MemoryRouter><AppRouter /></MemoryRouter>);
  await screen.findByText("Instance 1");
  fireEvent.click(screen.getByText("Profile"));
  expect(screen.getByText("Instance 1")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Post"));
  expect(screen.getByText("Instance 1")).toBeInTheDocument();
});
