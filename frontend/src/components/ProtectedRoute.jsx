import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleAuthRedirect } from "../utils/auth";

/**
 * A wrapper for routes that should only be accessible to authenticated users.
 * Redirects to login page if user is not authenticated.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if user is authenticated
 */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated, if not redirect to login
    handleAuthRedirect(navigate, "protected");
  }, [navigate]);

  return children;
}

export default ProtectedRoute;
