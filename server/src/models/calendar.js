import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    start: {
      dateTime: {
        type: Date,
        required: true,
      },
      timeZone: {
        type: String,
        required: true,
      },
    },
    end: {
      dateTime: {
        type: Date,
        required: true,
      },
      timeZone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const CalendarModel = mongoose.model("calendar", calendarSchema);
