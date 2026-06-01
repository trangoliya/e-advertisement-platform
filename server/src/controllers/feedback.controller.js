import AdFeedback from "../models/AdFeedback.js";

export const submitFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const userId = req.user.id;

    if (!["yes", "no"].includes(response)) {
      return res.status(400).json({
        success: false,
        message: "Response must be yes or no",
      });
    }

    const existingFeedback = await AdFeedback.findOne({
      userId,
      adId: id,
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "You already submitted feedback for this ad",
      });
    }

    const feedback = await AdFeedback.create({
      userId,
      adId: id,
      response,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};
