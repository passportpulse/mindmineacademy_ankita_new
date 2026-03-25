export const API_BASE_URL =
  "https://mindmineacademy-ankita-new.onrender.com";

export const getAdminHeaders = () => ({
  "Content-Type": "application/json",
  "admin-auth": localStorage.getItem("adminAuth") || "false",
});