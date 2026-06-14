import { render, screen } from "@testing-library/react";
import Contact from "@/components/Contact";

test("renders the contact form fields", () => {
  render(<Contact />);
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/tell us/i)).toBeInTheDocument();
});

test("renders Book a Discovery Call button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /book a discovery call/i })).toBeInTheDocument();
});

test("renders WhatsApp button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /chat on whatsapp/i })).toBeInTheDocument();
});

test("renders Email button", () => {
  render(<Contact />);
  expect(screen.getByRole("link", { name: /email directly/i })).toBeInTheDocument();
});
