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
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const handleCancel = () => {
    setDialogOpen(false);
  };

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
  const handleContinue = () => {
    setDialogOpen(false);
    handleDeleteRoom();
  };

  return (
    <div>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full m-1 gap-2" onClick={() => setDialogOpen(true)}>
            <Trash/>
            Delete Room
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure You Want to Delete This Room?</AlertDialogTitle>
            <AlertDialogDescription>
              Deleting this room will remove all its content, including tasks, notes, and participant data. This action
              cannot be undone. Are you certain you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
