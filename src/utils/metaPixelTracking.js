export function trackMetaEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  try {
    console.log("[trackMetaEvent]", eventName, params);
  } catch (e) {
    void e;
  }

  if (typeof window.fbq === "function") {
    try {
      window.fbq("trackCustom", eventName, params);
    } catch (err) {
      void err;
    }
  }
}