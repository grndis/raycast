const express = require("express");
const { getBackendResponse } = require("../utils/request");

const router = express.Router();

// Get user info
router.get("/", async (req, res) => {
  try {
    // If RAYCAST_EMAIL is set, return local user data without calling backend
    if (process.env.RAYCAST_EMAIL) {
      console.log(`<${process.env.RAYCAST_EMAIL}> is logged in locally.`);
      return res.json({
        email: process.env.RAYCAST_EMAIL,
        has_active_subscription: true,
        has_pro_features: true,
        has_better_ai: true,
        eligible_for_pro_features: true,
        eligible_for_ai: true,
        eligible_for_gpt4: true,
        eligible_for_ai_citations: true,
        eligible_for_developer_hub: true,
        eligible_for_application_settings: true,
        publishing_bot: true,
        can_upgrade_to_pro: false,
        admin: true,
        // Add some default user fields
        id: "local-user",
        name: "Local User",
        username: "local",
        avatar: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    // Fallback to backend if no RAYCAST_EMAIL is set
    const backendResponse = await getBackendResponse("/me", req.headers, "GET");
    res.json(backendResponse);
  } catch (error) {
    console.error("User info error:", error);
    res.status(500).json({
      error: true,
      message: error.message || "Failed to get user info",
      statusCode: 500,
    });
  }
});

// Sync endpoint
router.get("/sync", async (req, res) => {
  try {
    // Simple sync response for local mode
    if (process.env.RAYCAST_EMAIL) {
      return res.json({
        updated: [],
        updated_at: new Date().toISOString(),
        deleted: [],
      });
    }

    // Fallback to backend
    const backendResponse = await getBackendResponse(
      "/me/sync",
      req.headers,
      "GET",
    );
    res.json(backendResponse);
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({
      error: true,
      message: error.message || "Sync failed",
      statusCode: 500,
    });
  }
});

// Trial status
router.get("/trial_status", async (req, res) => {
  try {
    // Local mode - always return active trial
    if (process.env.RAYCAST_EMAIL) {
      return res.json({
        trial_active: true,
        trial_days_remaining: 999,
        has_pro_features: true,
      });
    }

    // Fallback to backend
    const backendResponse = await getBackendResponse(
      "/me/trial_status",
      req.headers,
      "GET",
    );
    res.json(backendResponse);
  } catch (error) {
    console.error("Trial status error:", error);
    res.status(500).json({
      error: true,
      message: error.message || "Failed to get trial status",
      statusCode: 500,
    });
  }
});

module.exports = router;
