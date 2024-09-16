import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createApiCall } from "@/utils/createApiCall";
import useSocketIO from "@/utils/useSocketio";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/user";

const Invite = () => {
  const { user } = useUserStore();
  const [searchName, setSearchName] = useState(""); // For search input
  const [inviteStatus, setInviteStatus] = useState(null); // To track invite status
  const [users, setUsers] = useState([]); // To store fetched users
  const [loading, setLoading] = useState(false); // Loading state for API call
  const { sendInvite } = useSocketIO();
  const { roomId } = useParams();
  // Function to send an invite to a specific user
  const sendInviteHandle = (userId) => {
    sendInvite(userId, roomId, user?._id);
    setInviteStatus(`Invite Sent to user ${userId}!`);
  };

  // Function to fetch users based on search query
  const fetchUsers = async (query) => {
    try {
      setLoading(true);
      const res = await createApiCall({
        method: "GET", // Make sure to specify the method
        route: "/users/search",
        query: { query }, // Pass the search query as a parameter
        withCredentials: true,
      });

      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version of fetchUsers
  const debouncedFetchUsers = useCallback(
    debounce((query) => {
      fetchUsers(query);
    }, 500),
    [],
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
    debouncedFetchUsers(e.target.value); // Fetch users after debouncing
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Invite People to Join a Room</CardTitle>
          <CardDescription>Send invites to users to join your room.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search input */}
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search for users"
              value={searchName}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Show loading spinner or fetched users */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ScrollArea className="mt-4 h-40">
              {users.length > 0 ? (
                <div>
                  {users.map((user) => (
                    <div key={user._id} className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={user.picture || "https://via.placeholder.com/50"} />
                          <AvatarFallback>{user.name}</AvatarFallback>
                        </Avatar>
                        <p>{user.name}</p>
                      </div>
                      <Button onClick={() => sendInviteHandle(user._id)} variant="default">
                        Send Invite
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No users found.</p>
              )}
            </ScrollArea>
          )}

          {/* Display invite status */}
          {inviteStatus && <p className="mt-2 text-green-500">{inviteStatus}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Invite;
