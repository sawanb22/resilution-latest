// storage.ts - Safe localStorage wrapper with memory fallback
// Handles incognito mode and third-party context blocking

let storageAvailable = false;
let memoryStorage: Record<string, string> = {};

// Test storage availability once
try {
  const test = '__storage_test__';
  localStorage.setItem(test, test);
  localStorage.removeItem(test);
  storageAvailable = true;
} catch (e) {
  console.warn('[EdenWidget] localStorage unavailable, using memory fallback');
  storageAvailable = false;
}

export const storage = {
  getItem: (key: string): string | null => {
    if (storageAvailable) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('[EdenWidget] getItem failed:', (e as Error).message);
        return memoryStorage[key] || null;
      }
    }
    return memoryStorage[key] || null;
  },

  setItem: (key: string, value: string): void => {
    if (storageAvailable) {
      try {
        localStorage.setItem(key, value);
        return;
      } catch (e) {
        console.warn('[EdenWidget] setItem failed:', (e as Error).message);
      }
    }
    memoryStorage[key] = value;
  },

  removeItem: (key: string): void => {
    if (storageAvailable) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('[EdenWidget] removeItem failed:', (e as Error).message);
      }
    }
    delete memoryStorage[key];
  },
};

// Storage keys (using pixel_ prefix as per middleware spec)
const KEYS = {
  VISITOR_ID: 'pixel_visitor_id',
  SESSION_ID: 'pixel_session_id',
  FORM_DONE: (sessionId: string) => `pixel_form_done_${sessionId}`,
};

// Visitor ID: one per browser, persists across sessions
export const getVisitorId = (): string => {
  let id = storage.getItem(KEYS.VISITOR_ID);
  if (!id) {
    id = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    storage.setItem(KEYS.VISITOR_ID, id);
    console.log('[EdenWidget] Created visitor ID:', id);
  }
  return id;
};

// Session ID: current chat session
export const getSessionId = (): string | null => {
  return storage.getItem(KEYS.SESSION_ID);
};

export const setSessionId = (id: string): void => {
  storage.setItem(KEYS.SESSION_ID, id);
  console.log('[EdenWidget] Saved session ID:', id);
};

export const clearSessionId = (): void => {
  const oldId = getSessionId();
  storage.removeItem(KEYS.SESSION_ID);
  console.log('[EdenWidget] Cleared session ID:', oldId);
};

// Form completion flag (per session)
export const isFormDone = (sessionId: string): boolean => {
  return storage.getItem(KEYS.FORM_DONE(sessionId)) === '1';
};

export const markFormDone = (sessionId: string): void => {
  storage.setItem(KEYS.FORM_DONE(sessionId), '1');
  console.log('[EdenWidget] Marked form done for session:', sessionId);
};

export const clearFormDone = (sessionId: string): void => {
  storage.removeItem(KEYS.FORM_DONE(sessionId));
};
