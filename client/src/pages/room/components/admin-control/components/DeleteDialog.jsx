import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createApiCall } from "@/utils/createApiCall";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";

export const DeleteDialog = ({ currentRoom }) => {
  const navigate = useNavigate();
  const handleDeleteRoom = async () => {
    const id = currentRoom._id;
    const response = await createApiCall({
      method: "DELETE",
      route: `/room/deleteroom/${id}`,
      withCredentials: true,
    });
    if (response) {
      navigate("/dashboard");
    }

    console.log(response);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full gap-2">
            <Trash className="h-4 w-4" />
            Delete Room
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this room?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={handleDeleteRoom} variant="destructive">
                Continue
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
