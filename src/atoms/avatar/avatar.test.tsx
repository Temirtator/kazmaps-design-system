import { render, screen } from "@testing-library/react";

import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders initials from name when no photo", () => {
    render(<Avatar name="Иван Петров" />);
    expect(screen.getByText("ИП")).toBeInTheDocument();
  });
  it("renders img when photoUrl given", () => {
    render(<Avatar name="Иван" photoUrl="/x.png" alt="Иван" />);
    expect(screen.getByAltText("Иван")).toBeInTheDocument();
  });
  it("falls back to a default accessible name without name", () => {
    render(<Avatar />);
    expect(screen.getByRole("img", { name: "Аватар пользователя" })).toBeInTheDocument();
  });
  it("fallback accessible name is overridable", () => {
    render(<Avatar ariaLabel="User avatar" />);
    expect(screen.getByRole("img", { name: "User avatar" })).toBeInTheDocument();
  });
});
