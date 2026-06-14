import { render, screen } from "@testing-library/react";
import AnimatedSequence from "@/components/AnimatedSequence";

test("renders all three phase labels", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText(/TELL US/i)).toBeInTheDocument();
  expect(screen.getByText(/WE BUILD/i)).toBeInTheDocument();
  expect(screen.getByText(/YOU SCALE/i)).toBeInTheDocument();
});

test("renders the typewriter phrase in phase 1", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText(/automate my sales workflow/i)).toBeInTheDocument();
});

test("renders all build step labels in phase 2", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText("Scope")).toBeInTheDocument();
  expect(screen.getByText("Build")).toBeInTheDocument();
  expect(screen.getByText("AI Live")).toBeInTheDocument();
});

test("renders timeline milestones in phase 3", () => {
  render(<AnimatedSequence />);
  expect(screen.getByText("Day 1")).toBeInTheDocument();
  expect(screen.getByText("Week 2")).toBeInTheDocument();
  expect(screen.getByText("Live")).toBeInTheDocument();
  expect(screen.getByText("Scale ∞")).toBeInTheDocument();
});
