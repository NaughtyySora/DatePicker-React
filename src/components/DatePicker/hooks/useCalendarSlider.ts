import { useRef, TouchEvent } from "react";

export type tUseCalendarSlider = ReturnType<typeof useCalendarSlider>;
type tDirection = "right" | "left";
type tMethods = "add" | "remove";

const onlyDigits = /\D/g;
const ms = 100;

export const useCalendarSlider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  let touchCoords = { start: 0, end: 0 };

  const animateSlide = (direction: tDirection) => {
    if (!sliderRef?.current) return;

    const timing = calcAnimationTiming(sliderRef.current);
    
    toggleSliderClass("add", direction);

    setTimeout(() => {
      toggleSliderClass("remove", direction);
    }, timing);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchCoords = { ...touchCoords, start: e.changedTouches[0].clientX };
  };

  const onTouchEnd = (onNext: CallableFunction, onPrev: CallableFunction, e: TouchEvent<HTMLDivElement>) => {
    touchCoords = { ...touchCoords, end: e.changedTouches[0].clientX };
    if (Object.values(touchCoords).every(coords => !coords)) return;
    const direction = touchCoords.start - touchCoords.end;
    direction > 0 ? onNext() : onPrev();
  };

  function toggleSliderClass(method: tMethods, className: tDirection) {
    sliderRef.current?.classList[method](className);
  }

  function calcAnimationTiming(sliderRef: HTMLDivElement) {
    const computedStyles = getComputedStyle(sliderRef);
    const animationDuration = computedStyles.getPropertyValue("animation-duration");
    return Number(animationDuration.replace(onlyDigits, "")) * ms;
  }

  return {
    sliderRef,
    animateSlide,
    onTouchStart,
    onTouchEnd
  };
};