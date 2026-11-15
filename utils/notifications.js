
import * as Notifications from "expo-notifications";

// Display notifications while the app is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function notifyFavoriteAdded(eventTitle) {
  try {
    // Check notification permissions.
    let permission = await Notifications.getPermissionsAsync();

    // Request permission if necessary.
    if (permission.status !== "granted") {
      permission = await Notifications.requestPermissionsAsync();
    }

    if (permission.status !== "granted") {
      console.log("Notification permission was not granted.");
      return;
    }

    // Schedule an immediate local notification.
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Added to Favorites",
        body: `${eventTitle} has been added to your favorites.`,
      },
      trigger: null,
    });

    console.log("Local notification scheduled successfully.");
  } catch (error) {
    console.log("Notification error:", error);
  }
}
