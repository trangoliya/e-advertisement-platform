import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {

    const alerts = await Alert.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(alerts);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch alerts"
    });
  }
};


export const markAlertRead = async (req, res) => {
  try {

    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json(alert);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update alert"
    });
  }
};