import { render, screen } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: jest.fn(), resolvedTheme: "dark" }),
}));

test("renders a toggle button", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("has accessible label", () => {
  render(<ThemeToggle />);
  expect(screen.getByRole("button")).toHaveAttribute("aria-label");
});
