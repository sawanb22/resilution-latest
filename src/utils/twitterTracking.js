export function trackTwitterEvent(eventId, params = {}) {
  if (typeof window === 'undefined') return;
  const twqFn = window.twq;
  // Log invocation so clicks are visible in the browser console
  try {
    console.log('[trackTwitterEvent] event:', eventId, params);
  } catch (e) {
    // ignore console errors in some environments
    void e;
  }
  if (typeof twqFn === 'function') {
    try {
      twqFn('event', eventId, params);
    } catch (err) {
      // ignore errors from twq, but avoid unused-var lint issues
      void err;
    }
  }
}
