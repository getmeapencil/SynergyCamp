import { useEffect } from "react";

export const useFavicon = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const favicon = document.getElementById("favicon");
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

      if (darkThemeMq.matches) {
        favicon.href = "/logo-white.svg";
      } else {
        favicon.href = "/logo-black.svg";
      }
    };

    updateFavicon();

    // Listen for changes in the theme preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateFavicon);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", updateFavicon);
    };
  }, []);
};
