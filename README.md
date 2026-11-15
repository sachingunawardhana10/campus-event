# Campus Events – Mobile Application

## 1. Application Overview

Campus Events is a mobile application developed using React Native and Expo. The application allows university students to explore upcoming campus events, view event details, filter events by category, and save their favorite events.

The application uses hard-coded event data and local notifications to provide a simple and user-friendly experience.

## 2. Application Screens

The application contains three main screens:

### 1. Home Screen
- Displays upcoming university events.
- Shows event images, categories, dates, times, and locations.
- Allows users to filter events by category.
- Allows users to add events to Favorites.
- Provides navigation to the Event Details screen.

### 2. Favorites Screen
- Displays events saved by the user.
- Allows users to remove events from Favorites.
- Allows users to open event details.

### 3. Event Details Screen
- Displays complete information about a selected event.
- Shows the event organizer and description.
- Allows users to add or remove events from Favorites.

## 3. React Native Components Used

| Component | Usage |
|---|---|
| View | Organizing screen layouts and content |
| Text | Displaying event information and labels |
| Image | Displaying event images |
| Pressable | Handling user interactions and navigation |
| FlatList | Displaying the list of events |
| Modal | Displaying the category filter |
| ScrollView | Making event details scrollable |

## 4. Navigation Structure

The application uses Expo Router for file-based navigation.

The main navigation includes:
- Home tab
- Favorites tab
- Event Details screen

The Home and Favorites screens are organized using a tab navigator. Event Details is accessed through a nested stack route.

## 5. Application State Management

React Context API is used to manage Favorites across different screens.

The FavoritesContext provides shared state and functions to:
- Add events to Favorites.
- Remove events from Favorites.
- Check whether an event is already a favorite.

This allows changes made on one screen to be reflected on other screens.

## 6. AppState API Implementation

The React Native AppState API is used to detect changes in the application's state.

An event listener detects when the application moves from the background or inactive state back to the foreground.

When the application returns to the foreground, a message is logged to the console.

## 7. Local Notifications Implementation

The application uses the `expo-notifications` library to implement local notifications.

When a user adds an event to Favorites:

1. The application checks notification permissions.
2. If permission has not been granted, the application requests permission.
3. An immediate local notification is scheduled.
4. The notification displays the title "Added to Favorites" and the selected event name.

The notification handler allows notifications to be displayed while the application is open.

## 8. Project Structure

```text
campus-events/
│
├── app/
│   ├── _layout.js
│   │
│   ├── (tabs)/
│   │   ├── _layout.js
│   │   ├── index.js
│   │   └── favorites.js
│   │
│   └── event/
│       ├── _layout.js
│       └── [id].js
│
├── assets/
│
├── context/
│   └── FavoritesContext.js
│
├── data/
│   └── events.js
│
├── utils/
│   └── notifications.js
│
├── app.json
├── package.json
└── README.md
```

## 9. Installation and Execution

### Prerequisites
- Node.js
- npm
- Expo Go application (Android or iOS)

### Clone the Repository

```bash
git clone https://github.com/sachingunawardhana10/campus-event.git
```

### Navigate to the Project

```bash
cd campus-events
```

### Install Dependencies

```bash
npm install
```

### Start the Application

```bash
npx expo start
```

Scan the QR code using Expo Go to run the application.

## 10. Technologies Used

- React Native
- Expo
- JavaScript
- Expo Router
- React Context API
- Expo Notifications
- React Native AppState API

## 11. Demo Video

Public Demo Video: https://drive.google.com/file/d/1PGItIeV7xyqyRAoGu38a_0Z1aGeyoBWe/view?usp=drive_link

## 12. Student Details

- Student Name: B.V.S.D Gunawardhana
- Student ID: PS/2022/200

## 13. Repo

link: https://github.com/sachingunawardhana10/campus-event.git

---

**Course:** Mobile Application Development

**Project:** Campus Events Mobile Application
