/** return time in format - "08:23 PM" */
export const formatDateTime = (date) => {
  // Add time in "hh:mm AM/PM" format
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return formattedTime;
};

/** return date time in format - "Thursday, September 2nd, 2021 at 6:39 PM" */
export const formatDateWithWeekday = (date) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  function getOrdinalSuffix(day) {
    const lastDigit = day % 10;
    const secondLastDigit = Math.floor((day % 100) / 10);

    if (lastDigit === 1 && secondLastDigit !== 1) {
      return "st";
    } else if (lastDigit === 2 && secondLastDigit !== 1) {
      return "nd";
    } else if (lastDigit === 3 && secondLastDigit !== 1) {
      return "rd";
    } else {
      return "th";
    }
  }

  const ordinalSuffix = getOrdinalSuffix(date.getDate());
  const formattedDateWithOrdinal = `${formattedDate.slice(0, -6)}${ordinalSuffix}, ${formattedDate.slice(-4)}`;

  return `${formattedDateWithOrdinal} at ${formatDateTime(date)}`;
};
