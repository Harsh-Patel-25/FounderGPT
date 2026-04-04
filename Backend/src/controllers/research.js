import { analyzeResearch } from "../services/researchService.js";

export async function handleResearch(req, res, next) {
  try {
    const idea = req.validatedBody;

    const result = await analyzeResearch(idea);

    res.json({
      status: "success",
      message: "Research analysis complete",
      data: result
    });

  } catch (err) {
    next(err);
  }
}