import { StartupIdeaSchema } from "../types/index.js";

/**
 * Express middleware that validates req.body against the StartupIdea Zod schema.
 * Returns 400 with detailed error messages on failure.
 */
export default function validateRequest(req, res, next) {
  const result = StartupIdeaSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
  }

  // Attach validated data
  req.validatedBody = result.data;
  next();
}
