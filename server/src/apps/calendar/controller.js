import { google } from "googleapis";
import { oauthClient } from "../auth/controller.js";
import { CalendarModel } from "../../models/calendar.js";
import axios from "axios";

export const createEvent = async (req, res) => {
  const { accessToken, eventData } = req.body;
  console.log("createEvent ~ req.body:", req.body);

  oauthClient.setCredentials({ access_token: accessToken });
  console.log("createEvent ~ ping1:");
  console.log("oauthClient:", oauthClient);

  const calendar = google.calendar({ version: "v3", auth: oauthClient });
  console.log("createEvent ~ calendar:", calendar);
  console.log("createEvent ~ ping2:");

  let startDateTimeString = `${eventData.endDate}T${eventData.endTime}:00`;
  let endDateTimeString = `${eventData.endDate}T${eventData.endTime}:00`;

  // Create Date objects
  let startDateTime = new Date(startDateTimeString);
  let endDateTime = new Date(endDateTimeString);

  console.log("createEvent ~ ping3:");

  const event = {
    summary: eventData.summary,
    description: eventData.description,
    start: {
      dateTime: startDateTimeString,
      timeZone: eventData.timezone,
    },
    end: {
      dateTime: endDateTimeString,
      timeZone: eventData.timezone,
    },
  };
  console.log("createEvent ~ event:", event);

  try {
    // const response = await axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", event, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`, // OAuth token for authentication
    //     "Content-Type": "application/json",
    //   },
    // });

    const response = await calendar.events.insert({
      auth: oauthClient,
      calendarId: "primary",
      resource: event,
    });
    console.log("createEvent ~ response.data:", response.data);
    await CalendarModel.create(event);

    res.status(200).json({ event: event });
  } catch (error) {
    console.log("createEvent ~ error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to create event" });
  }
};
