import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

export const EventForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [allDay, setAllDay] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="flex flex-1 flex-col p-4">
      {!showForm ? (
        <Button onClick={toggleForm} className="w-full justify-start text-left font-normal">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      ) : (
        <ScrollArea className="-mx-4 flex-grow px-4">
          <div className="space-y-4 pb-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="Enter event title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input id="start-date" type="date" />
            </div>
            {!allDay && (
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input id="end-date" type="date" />
            </div>
            {!allDay && (
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" />
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Switch id="all-day" checked={allDay} onCheckedChange={setAllDay} />
              <Label htmlFor="all-day">All day</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Add location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Add description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar">Calendar</Label>
              <Select>
                <SelectTrigger id="calendar">
                  <SelectValue placeholder="Select a calendar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" placeholder="Add guests" />
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={toggleForm}>
                Cancel
              </Button>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};
