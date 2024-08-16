import { useState, useEffect } from "react";

// Hook to get the current date formatted based on the user's timezone
export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZoneName: "short", // Include the timezone abbreviation
    };
    setCurrentDate(today.toLocaleDateString(undefined, options));
  }, []);

  return currentDate;
};
