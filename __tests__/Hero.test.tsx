import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

jest.mock("@/components/AnimatedSequence", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="animated-sequence" />,
  };
});


test("renders the main headline", () => {
  render(<Hero />);
  expect(screen.getByText(/We don't just/i)).toBeInTheDocument();
});

test("renders the eyebrow label", () => {
  render(<Hero />);
  expect(screen.getByText(/AI INTEGRATION/i)).toBeInTheDocument();
});

test("renders the See Our Services CTA", () => {
  render(<Hero />);
  expect(screen.getByRole("link", { name: /see our services/i })).toBeInTheDocument();
});

test("renders the animated sequence", () => {
  render(<Hero />);
  expect(screen.getByTestId("animated-sequence")).toBeInTheDocument();
});

test("renders stat: 10+ Services", () => {
  render(<Hero />);
  expect(screen.getByText("10+")).toBeInTheDocument();
});



