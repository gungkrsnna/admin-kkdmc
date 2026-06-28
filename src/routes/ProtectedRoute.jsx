import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";

function ProtectedRoute({
  children,
}) {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    setUser(user);

    setLoading(false);
  };

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;