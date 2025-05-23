/**
 * A lightweight scroll manager for optimizing animations on scroll
 */

type ScrollObserver = (scrollY: number, direction: 'up' | 'down') => void;

class ScrollManager {
  private observers: ScrollObserver[] = [];
  private lastScrollY: number = 0;
  private ticking: boolean = false;
  private scheduledAnimationFrame: number | null = null;
  private isInitialized: boolean = false;
  private scrollTimeout: number | null = null;
  private readonly SCROLL_THROTTLE = 16; // ~60fps

  constructor() {
    // Bind methods to this instance
    this.handleScroll = this.handleScroll.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * Initialize the scroll manager
   */
  init(): void {
    // Only run on client side and avoid double initialization
    if (typeof window === 'undefined' || this.isInitialized) return;
    
    // Mark as initialized
    this.isInitialized = true;
    
    // Initialize with current scroll position
    this.lastScrollY = window.scrollY || window.pageYOffset;
    
    // Add event listener with passive option for better performance
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    
    // Immediate first update to initialize positions
    this.update();
  }

  /**
   * Clean up the scroll manager
   */
  destroy(): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;
    
    // Reset initialization status
    this.isInitialized = false;
    
    if (this.scheduledAnimationFrame) {
      cancelAnimationFrame(this.scheduledAnimationFrame);
      this.scheduledAnimationFrame = null;
    }

    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
    
    window.removeEventListener('scroll', this.handleScroll);
    this.observers = [];
  }

  /**
   * Add a scroll observer
   */
  observe(callback: ScrollObserver): () => void {
    // Auto-initialize if needed
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.init();
    }
    
    this.observers.push(callback);
    
    // Immediately notify the observer of current position
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY || window.pageYOffset;
      callback(currentScrollY, 'down');
    }
    
    // Return a function to unsubscribe this observer
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback);
    };
  }

  /**
   * Handle scroll events with throttling via requestAnimationFrame
   */
  private handleScroll(): void {
    if (!this.ticking) {
      // Use requestAnimationFrame for smooth updates
      this.scheduledAnimationFrame = requestAnimationFrame(this.update);
      this.ticking = true;

      // Add a class to body during scroll for CSS optimizations
      document.body.classList.add('is-scrolling');
      
      // Remove the class after scrolling stops
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      
      this.scrollTimeout = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, this.SCROLL_THROTTLE);
    }
  }

  /**
   * Update all observers with current scroll information
   */
  private update(): void {
    if (typeof window === 'undefined') return;
    
    const currentScrollY = window.scrollY || window.pageYOffset;
    const direction = currentScrollY > this.lastScrollY ? 'down' : 'up';
    
    // Only notify observers if scroll position has changed significantly
    if (Math.abs(currentScrollY - this.lastScrollY) > 0) {
      // Notify all observers
      this.observers.forEach(observer => {
        observer(currentScrollY, direction);
      });
    }
    
    // Update state for next scroll event
    this.lastScrollY = currentScrollY;
    this.ticking = false;
  }
}

// Create the scrollManager as a lazy-loaded singleton that's created only when needed
let instance: ScrollManager | null = null;

function getScrollManager(): ScrollManager {
  if (instance === null) {
    instance = new ScrollManager();
  }
  return instance;
}

// Export the singleton instance
export const scrollManager = getScrollManager();

// Hook to use in components
export function useScrollManager(): ScrollManager {
  return scrollManager;
}
