import Alert from "../models/Alert.js";

// Get User Alerts
export const getAlerts = async (req, res, next) => {
  try {
    const alerts = await Alert.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};

// Mark Alert As Read
export const markAlertRead = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Alert marked as read",
      data: alert,
    });
  } catch (error) {
    next(error);
  }
};
