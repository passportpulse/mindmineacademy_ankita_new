export const API_BASE_URL =
  "";

export const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  "admin-auth": localStorage.getItem("adminAuth") || "false",
});