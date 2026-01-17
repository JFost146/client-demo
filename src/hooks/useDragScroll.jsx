import { useEffect, useRef } from "react";

export function useDragScroll(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startY = 0;
    let startScrollTop = 0;
    let dragging = false;
    let pointerId = null;

    const THRESHOLD = 10;

    const isInteractive = (target) => {
      if (!target) return false;
      return !!target.closest(
        "button, a, input, textarea, select, label, [role='button'], [data-no-drag]"
      );
    };

    const onPointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      if (isInteractive(e.target)) return;

      isDown = true;
      dragging = false;
      pointerId = e.pointerId;

      startY = e.clientY;
      startScrollTop = el.scrollTop;
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      if (e.pointerId !== pointerId) return;

      const dy = e.clientY - startY;

      if (!dragging) {
        if (Math.abs(dy) < THRESHOLD) return;
        dragging = true;
        el.setPointerCapture?.(pointerId);
      }

      el.scrollTop = startScrollTop - dy;
    };

    const onPointerUp = () => {
      isDown = false;
      dragging = false;
      pointerId = null;
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [enabled]);

  return ref;
}
