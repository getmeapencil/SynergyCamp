import { google } from "googleapis";
import { oauthClient } from "../auth/controller.js";
import { CalendarModel } from "../../models/calendar.js";

export const createEvent = async (req, res) => {
  const { accessToken, eventData } = req.body;

  oauthClient.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauthClient });

  const event = {
    summary: eventData.summary,
    description: eventData.description,
    start: {
      dateTime: eventData.startDateTime,
      timeZone: eventData.timeZone,
    },
    end: {
      dateTime: eventData.endDateTime,
      timeZone: eventData.timeZone,
    },
  };

  try {
    const createdEvent = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    await CalendarModel.create(event);

    res.status(200).json({ event: createdEvent });
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};
