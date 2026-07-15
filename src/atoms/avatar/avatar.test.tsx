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
});
