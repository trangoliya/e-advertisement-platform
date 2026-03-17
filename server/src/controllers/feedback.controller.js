import AdFeedback from "../models/AdFeedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { id } = req.params; // adId
    const { response } = req.body;

    const userId = req.user.id;

    // check if user already submitted feedback
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

    // save feedback
    const feedback = await AdFeedback.create({
      userId,
      adId: id,
      response,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};