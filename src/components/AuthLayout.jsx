import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const currentState = useSelector((state) => state.auth.isAuthenticated); 
  if(currentState){
    const userType=useSelector((state)=>state.auth.usertype)
  }
   

  useEffect(() => {
    if (authentication && currentState === false) {
      // If authentication is required but the user is not authenticated
      setLoading(false);
    } else if (!authentication && currentState === true) {
      // If no authentication is required but the user is authenticated
      setLoading(false);
    } else {
      setLoading(false);  // No navigation needed, just stop loading
    }
  }, [authentication, currentState]);

  // Redirect user if loading is done and conditions are met
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Check authentication status and redirect if necessary
  if (authentication && currentState === false  ) {
    return <Navigate to="/login" />;
  }

  if (!authentication && currentState === true && userType=== 'buyer') {
    return <Navigate to="/user-dashboard" />;
  }

  if (!authentication && currentState === true && userType=== 'seller') {
    return <Navigate to="/seller-dashboard" />;
  }

  return <>{children}</>;  // Render the children if the conditions are satisfied
}

export default AuthLayout;
