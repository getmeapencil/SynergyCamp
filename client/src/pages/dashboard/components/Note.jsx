import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PencilIcon } from "lucide-react";
import { useUserStore } from "@/store/user";

export const Inspiration = () => {
  const [note, setNote] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newNote = formData.get("note");
    const newFontSize = parseInt(formData.get("fontSize"), 10);
    setNote(newNote);
    setFontSize(newFontSize);
    setIsDialogOpen(false);
  };

  const firstName = user?.name?.split(" ")[0] || "there";
  return (
    <Card className="h-fit w-1/3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Note</CardTitle>
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
                  defaultValue={note}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size (px)</Label>
                <Input id="fontSize" name="fontSize" type="number" defaultValue={fontSize} min={8} max={72} />
              </div>
              <Button type="submit" className="w-full">
                Save Note
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: `${fontSize}px` }} className="text-center">
          {note || (
            <>
              Hello, {firstName}
              <br />
              Let’s be productive today.
            </>
          )}
        </p>
      </CardContent>
    </Card>
  );
};
