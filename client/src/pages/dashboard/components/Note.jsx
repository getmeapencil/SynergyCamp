import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useNoteStore } from "@/store/note";

export const Note = () => {
  const user = useUserStore((state) => state.user);
  const { dashboardNote, setDashboardNote } = useNoteStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNote = formData.get("note").trim();
    const newFontSize = parseInt(formData.get("fontSize"), 10);
    setDashboardNote({ note: newNote, fontSize: newFontSize });
    setIsDialogOpen(false);
  };

  const firstName = user?.name?.split(" ")[0] || "there";

  const gradientText = (text) => {
    return (
      <span className="animate-gradient-x bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        {text}
      </span>
    );
  };

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Note</CardTitle>
          <CardDescription>Your personalized note</CardDescription>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <PencilIcon className="h-4 w-4" />
              <span className="sr-only">Edit note</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  name="note"
                  placeholder="Anything from favorite quote to your goals"
                  defaultValue={dashboardNote.note}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size (px)</Label>
                <Input
                  id="fontSize"
                  name="fontSize"
                  type="number"
                  defaultValue={dashboardNote.fontSize}
                  min={8}
                  max={72}
                />
              </div>
              <Button type="submit" className="w-full">
                Save Note
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent style={{ fontSize: `${dashboardNote.fontSize}px` }} className="whitespace-pre-line leading-tight">
        {dashboardNote.note || (
          <>
            <strong className="font-bold">{gradientText(`Hello, ${firstName}`)}</strong>
            <br />
            Let&apos;s be productive today.
          </>
        )}
      </CardContent>
    </Card>
  );
};
