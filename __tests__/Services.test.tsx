import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Services from "@/components/Services";

test("renders both tab labels", () => {
  render(<Services />);
  expect(screen.getByRole("button", { name: /AI INTEGRATION/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /REVENUE ENGINEERING/i })).toBeInTheDocument();
});

test("shows Tanmoy's services by default", () => {
  render(<Services />);
  expect(screen.getByText("AI Systems Integration")).toBeInTheDocument();
});

test("switches to Dipta's services on tab click", async () => {
  render(<Services />);
  await userEvent.click(screen.getByRole("button", { name: /REVENUE ENGINEERING/i }));
  expect(screen.getByText("AI Agent Development & Deployment")).toBeInTheDocument();
});
