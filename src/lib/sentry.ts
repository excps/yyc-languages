import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking in production
 * Only runs if VITE_SENTRY_DSN is configured
 */
export function initSentry() {
  // Only initialize Sentry in production and if DSN is configured
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!import.meta.env.PROD || !dsn) {
    console.log("Sentry disabled - running in development mode or DSN not configured");
    return;
  }

  Sentry.init({
    dsn,

    // Set the environment (production, staging, etc.)
    environment: import.meta.env.MODE,

    // Set release version from package.json
    release: `yyclanguages@${import.meta.env.VITE_APP_VERSION || "unknown"}`,

    // Capture 100% of errors in production
    // For high-traffic sites, you might want to sample (e.g., 0.1 for 10%)
    tracesSampleRate: 1.0,

    // Capture user interactions (button clicks, page loads, etc.)
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Capture 10% of sessions for replay
        sessionSampleRate: 0.1,
        // Capture 100% of sessions with errors for replay
        errorSampleRate: 1.0,
      }),
    ],

    // Don't send errors from localhost or development
    beforeSend(event, hint) {
      // Check if we're in production
      if (!import.meta.env.PROD) {
        return null;
      }
      return event;
    },

    // Filter out noise - don't report these errors
    ignoreErrors: [
      // Browser extension errors
      "top.GLOBALS",
      "chrome-extension://",
      "moz-extension://",
      // Network errors that aren't actionable
      "Network request failed",
      "NetworkError",
      // Third-party script errors
      "Script error.",
    ],
  });
}
