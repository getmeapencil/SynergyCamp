import { useState } from "react";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendarStore } from "@/store/calendar";

export const Calendar = () => {
  const createCalendarEvent = useCalendarStore((state) => state.createCalendarEvent);

  const [showForm, setShowForm] = useState(false);
  const [allDay, setAllDay] = useState(false);

  const toggleForm = () => setShowForm(!showForm);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      summary,
      description,
      startDate,
      startTime: allDay ? null : startTime,
      endDate,
      endTime: allDay ? null : endTime,
      allDay,
    };
    console.log("handleSubmit ~ eventData:", eventData);

    createCalendarEvent(eventData);
    // resetForm();
  };

  // Function to reset the form fields
  const resetForm = () => {
    setSummary("");
    setDescription("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setAllDay(false);
  };
  return (
    <div className="flex flex-1 flex-col p-4">
      {!showForm ? (
        <Button onClick={toggleForm} className="w-full justify-start text-left font-normal">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      ) : (
        <ScrollArea className="-mx-4 flex-grow px-4">
          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Event Summary</Label>
              <Input
                id="summary"
                placeholder="Enter event title"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            {!allDay && (
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            {!allDay && (
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            )}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={toggleForm}>
                Cancel
              </Button>
              <Button type="submit">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          </form>
        </ScrollArea>
      )}
    </div>
  );
};
