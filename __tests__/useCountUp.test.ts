import { renderHook, waitFor } from "@testing-library/react";
import useCountUp from "@/hooks/useCountUp";

test("returns 0 when not active", () => {
  const { result } = renderHook(() => useCountUp({ target: 10, active: false }));
  expect(result.current).toBe(0);
});

test("returns target value when active with duration 0", async () => {
  const { result } = renderHook(() => useCountUp({ target: 10, active: true, duration: 0 }));
  await waitFor(() => {
    expect(result.current).toBe(10);
  });
});
