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

        const onPointerDown = (e) => {
            const tag = e.target?.tagName?.toLowerCase();
            if (["button", "input", "textarea", "select", "label"].includes(tag)) return;
            if (e.button !== undefined && e.button !== 0) return;

            isDown = true;
            startY = e.clientY;
            startScrollTop = el.scrollTop;
            el.setPointerCapture?.(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!isDown) return;
            const dy = e.clientY - startY;
            el.scrollTop = startScrollTop - dy;
        };

        const onPointerUp = () => {
            isDown = false;
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
