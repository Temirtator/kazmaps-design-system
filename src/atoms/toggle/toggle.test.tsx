import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Toggle } from "./toggle";

describe("Toggle", () => {
  it("reports the opposite state on click", async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} label="Уведомления" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("gets its accessible name from the label", () => {
    render(<Toggle checked={false} onChange={vi.fn()} label="Уведомления" />);
    expect(screen.getByRole("switch", { name: "Уведомления" })).toBeInTheDocument();
  });

  it("toggles when the label text is clicked", async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} label="Уведомления" />);
    await userEvent.click(screen.getByText("Уведомления"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("thumb uses the bg token so it stays visible in dark theme", () => {
    const { container } = render(<Toggle checked onChange={vi.fn()} />);
    const thumb = container.querySelector("button span");
    expect(thumb).toHaveClass("bg-[var(--bg)]");
  });
});
