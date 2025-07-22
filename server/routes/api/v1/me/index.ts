export default defineEventHandler(async event => {
  // If RAYCAST_EMAIL is set, return local user data without calling backend
  if (process.env.RAYCAST_EMAIL) {
    console.info(`<${process.env.RAYCAST_EMAIL}> is logged in locally.`)
    return {
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
      updated_at: new Date().toISOString()
    }
  }
  
  // Fallback to backend if no RAYCAST_EMAIL is set
  const { req } = event.node
  const backendResponse = await getBackendResponse("/me", req.headers, "GET")
  return backendResponse
})
