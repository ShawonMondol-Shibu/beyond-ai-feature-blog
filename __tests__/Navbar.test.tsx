import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

jest.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: jest.fn() }),
}));

test("renders logo image", () => {
  render(<Navbar />);
  expect(screen.getByAltText("Beyond AI")).toBeInTheDocument();
});


test("renders all nav links", () => {
  render(<Navbar />);
  expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "How It Works" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
});

test("renders Book a Call CTA", () => {
  render(<Navbar />);
  expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
});
