import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    summary: {
      type: string,
      required: true,
    },
    description: {
      type: string,
      required: true,
    },
    start: {
      dateTime: {
        type: Date,
        required: true,
      },
      timeZone: {
        type: string,
        required: true,
      },
    },
    end: {
      dateTime: {
        type: Date,
        required: true,
      },
      timeZone: {
        type: string,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const CalendarModel = mongoose.model("calendar", calendarSchema);
