export const notifyUser = async ({ message, icon }) => {
  // Check if the browser supports Notifications
  if (!("Notification" in window)) {
    console.log("Browser does not support notifications.");
    return;
  }

  // Function to show the notification
  const showNotification = () => {
    new Notification("MindMesh", {
      body: message,
      icon: icon || "/mindmesh-logo.png",
    });
  };

  // Check if permission is already granted
  if (Notification.permission === "granted") {
    showNotification();
  } else if (Notification.permission !== "denied") {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        showNotification();
      } else {
        console.log("User blocked notifications.");
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
    }
  } else {
    console.log("Notifications are blocked.");
  }
};
