/**
 * Authentication utility functions for MigAid app
 */

/**
 * Check if a user is authenticated by looking for a token in localStorage
 * @returns {boolean} true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("firebaseIdToken");
  return !!token; // Convert to boolean
};

/**
 * Get the current authentication token from localStorage
 * @returns {string|null} The token if it exists, null otherwise
 */
export const getAuthToken = () => {
  return localStorage.getItem("firebaseIdToken");
};

/**
 * Clear authentication data from localStorage (for logout)
 */
export const logout = () => {
  localStorage.removeItem("firebaseIdToken");
  // Add any other auth-related items that should be cleared
};

/**
 * Redirect to login page if not authenticated, or to main page if already authenticated
 * based on the intended destination
 * @param {function} navigate - React Router's navigate function
 * @param {string} intendedDestination - 'auth' for auth pages like login/register, 'protected' for user pages
 */
export const handleAuthRedirect = (navigate, intendedDestination) => {
  const isLoggedIn = isAuthenticated();

  if (intendedDestination === "auth" && isLoggedIn) {
    // User is already logged in and trying to access login/register pages
    navigate("/users/main");
  } else if (intendedDestination === "protected" && !isLoggedIn) {
    // User is not logged in and trying to access protected pages
    navigate("/giris");
  }
  // In other cases, no redirect is needed
};
