import { useCallback, useState } from "react";

interface SwipeEventData {
  direction: "Up" | "Down" | "Left" | "Right";
}

type SwipeHandler = (_eventData: SwipeEventData) => void;

const useSwipe = (onSwiped: SwipeHandler) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchStartY(event.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const dx = touchEndX - touchStartX;
      const dy = touchEndY - touchStartY;

      if (!dx && !dy) return;

      if (Math.abs(dx) < Math.abs(dy)) {
        if (dy > 0) {
          onSwiped({ direction: "Down" });
        } else {
          onSwiped({ direction: "Up" });
        }
      } else {
        if (dx > 0) {
          onSwiped({ direction: "Right" });
        } else {
          onSwiped({ direction: "Left" });
        }
      }
    },
    [onSwiped, touchStartX, touchStartY]
  );

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };

  return swipeHandlers;
};

export default useSwipe;
