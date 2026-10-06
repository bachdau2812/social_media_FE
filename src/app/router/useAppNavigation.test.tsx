import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useAppNavigation } from "./useAppNavigation";

function Harness() {
  const nav = useAppNavigation();
  return <>
    <output data-testid="url">{nav.location.pathname}{nav.location.search}</output>
    <output data-testid="view">{nav.screen.view}:{nav.screen.profileUserId}</output>
    <button onClick={() => nav.go("/profile/u-1")}>Profile</button>
    <button onClick={() => nav.openResource("/post/p-1")}>Post</button>
    <button onClick={nav.closeResource}>Close</button>
    <button onClick={nav.back}>Back</button>
    <button onClick={() => nav.navigate(1)}>Forward</button>
    <button onClick={() => nav.navigate(-1)}>Browser back</button>
  </>;
}
beforeEach(() => vi.spyOn(window, "scrollTo").mockImplementation(() => {}));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("updates resource URLs while retaining the modal background screen", () => {
  render(<MemoryRouter initialEntries={["/profile/u-1"]}><Harness /></MemoryRouter>);
  fireEvent.click(screen.getByText("Post"));
  expect(screen.getByTestId("url")).toHaveTextContent("/post/p-1");
  expect(screen.getByTestId("view")).toHaveTextContent("profile:u-1");
  fireEvent.click(screen.getByText("Close"));
  expect(screen.getByTestId("url")).toHaveTextContent("/profile/u-1");
});

it("records native Back/Forward scroll for the departing screen", () => {
  let scrollY = 0;
  vi.spyOn(window, "scrollY", "get").mockImplementation(() => scrollY);
  render(<MemoryRouter initialEntries={["/"]}><Harness /></MemoryRouter>);
  fireEvent.click(screen.getByText("Profile"));
  scrollY = 800;
  fireEvent.scroll(window);
  fireEvent.click(screen.getByText("Browser back"));
  scrollY = 0;
  fireEvent.click(screen.getByText("Forward"));
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 800, behavior: "auto" });
});

it("uses browser history for Back and Forward", () => {
  render(<MemoryRouter initialEntries={["/"]}><Harness /></MemoryRouter>);
  fireEvent.click(screen.getByText("Profile"));
  fireEvent.click(screen.getByText("Back"));
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/$/);
  fireEvent.click(screen.getByText("Forward"));
  expect(screen.getByTestId("url")).toHaveTextContent("/profile/u-1");
});

it("closes directly loaded resources to a safe home URL", () => {
  render(<MemoryRouter initialEntries={["/post/p-1"]}><Harness /></MemoryRouter>);
  fireEvent.click(screen.getByText("Close"));
  expect(screen.getByTestId("url")).toHaveTextContent(/^\/$/);
});

it("normalizes legacy notification URLs without losing the requested resource", async () => {
  render(<MemoryRouter initialEntries={["/?notificationTarget=post&postId=p-1&commentId=c-1"]}><Harness /></MemoryRouter>);
  await act(async () => {});
  expect(screen.getByTestId("url")).toHaveTextContent("/post/p-1?commentId=c-1");
});

it("restores the background scroll position after a post closes", async () => {
  vi.spyOn(window, "scrollY", "get").mockReturnValue(430);
  render(<MemoryRouter initialEntries={["/"]}><Harness /></MemoryRouter>);
  fireEvent.click(screen.getByText("Post"));
  vi.spyOn(window, "scrollY", "get").mockReturnValue(0);
  fireEvent.click(screen.getByText("Close"));
  await act(async () => {});
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 430, behavior: "auto" });
});
