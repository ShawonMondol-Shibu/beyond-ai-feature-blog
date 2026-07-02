"use client";

export default function ViewTransition({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      style={{ viewTransitionName: name }}
      className={className}
    >
      {children}
    </span>
  );
}
