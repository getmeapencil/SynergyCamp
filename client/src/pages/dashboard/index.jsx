import { useUserStore } from "@/store/user";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  // get user from store
  const { user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    // fetch user data
    if (!user) {
      useUserStore.getState().fetchUser();
    }
  }, [user]);
  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome {user.name}</h1>
          <p>Email: {user.email}</p>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={() =>
              useUserStore
                .getState()
                .logout()
                .then(() => navigate("/login"))
            }
          >
            Log out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
