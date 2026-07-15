import { render, screen } from "@testing-library/react";

import { Heading } from "./heading";

describe("Heading", () => {
  it("renders the requested heading level", () => {
    render(<Heading as="h2">Заголовок</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Заголовок" })).toBeInTheDocument();
  });
});
