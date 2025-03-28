/**
 * Smoothly scrolls to a target element with customizable easing and duration
 */
export function smoothScrollTo(
  targetElement: HTMLElement,
  duration = 800,
  easing = 'easeInOutCubic',
  offset = 0
): void {
  // Early return if no element
  if (!targetElement) return;

  // Easing functions
  const easings = {
    // Accelerating from zero velocity
    easeInQuad: (t: number) => t * t,
    // Decelerating to zero velocity
    easeOutQuad: (t: number) => t * (2 - t),
    // Acceleration until halfway, then deceleration
    easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    // Smooth cubic easing
    easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    // More pronounced cubic easing - acceleration and deceleration
    easeInCubic: (t: number) => t * t * t,
    easeOutCubic: (t: number) => (--t) * t * t + 1,
    // Linear (no easing)
    linear: (t: number) => t,
  };

  // Get the selected easing function or fallback to easeInOutCubic
  const easingFunction = easings[easing as keyof typeof easings] || easings.easeInOutCubic;

  // Get start position
  const startPosition = window.scrollY || window.pageYOffset;
  // Get target position
  const targetPosition = targetElement.getBoundingClientRect().top + startPosition - offset;
  // Distance to scroll
  const distance = targetPosition - startPosition;

  let startTime: number | null = null;

  // Animation function
  function animation(currentTime: number) {
    if (startTime === null) {
      startTime = currentTime;
    }
    
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easingFunction(progress);
    
    window.scrollTo(0, startPosition + distance * easedProgress);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  // Start animation
  requestAnimationFrame(animation);
}
