import logger from "../utils/logger.js";

/**
 * Global error-handling middleware.
 * Must be registered AFTER all routes.
 */
export default function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const isDev = process.env.NODE_ENV !== "production";

  // In development, always show the real error message.
  // In production, only expose the message if explicitly marked safe.
  const message = isDev
    ? (err.message || "Internal server error")
    : (err.expose ? err.message : "Internal server error");

  logger.error(err);

  res.status(status).json({
    status: "error",
    message,
    ...(isDev && { stack: err.stack }),
  });
}
