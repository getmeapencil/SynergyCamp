import { create } from "zustand";
import { createApiCall } from "@/utils/createApiCall";
import { useUserStore } from "./user";
import moment from "moment-timezone";

export const useCalendarStore = create((set, get) => ({
  calendar: undefined,
  createCalendarEvent: async (eventData) => {
    try {
      const accessToken = useUserStore.getState().authToken;
      eventData.timezone = moment.tz.guess();
      const calendarEvent = await createApiCall({
        method: "POST",
        route: "/calendar",
        data: { accessToken, eventData },
        withCredentials: true,
      });
      console.log("createCalendarEvent: ~ calendarEvent:", calendarEvent);
    } catch (error) {
      console.error("Error creating calendarEvent:", error);
    }
  },
}));
