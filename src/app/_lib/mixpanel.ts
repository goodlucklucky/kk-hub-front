// Create a new file lib/mixpanel.ts
import mixpanel from "mixpanel-browser";

export const initMixpanel = () => {
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

  if (!token) return // console.warn("Mixpanel token not found");

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === "development",
    track_pageview: true,
    persistence: "localStorage",
    ignore_dnt: true,
  });
};

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return;
  if (!(mixpanel as any).__loaded) {
    // console.warn("Mixpanel not initialized yet");
    return;
  }

  const defaultProps = {
    environment: process.env.NODE_ENV,
    app_version: process.env.NEXT_PUBLIC_APP_VERSION || "27 Jan 2024",
    platform: "telegram_webapp",
  };

  mixpanel.track(event, { ...defaultProps, ...properties });
};

export const setUserProperties = (user: {
  id: string;
  username?: string;
  photo_url?: string;
}) => {
  if (typeof window === "undefined") return;
  if (!(mixpanel as any).__loaded) return;

  mixpanel.identify(user.id);
  mixpanel.people.set({
    $name: user.username,
    $avatar: user.photo_url,
    $created: new Date().toISOString(),
    last_active: new Date().toISOString(),
  });
};
