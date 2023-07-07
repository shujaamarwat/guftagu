## Guftagu

Real-time chat app built with React, Redux Toolkit, GraphQL, MongoDB and Firebase Auth. Stores messages in a MongoDB database using GraphQL and allows users to send and receive messages in real-time.

### How to Use

To use this app, follow these steps:

1. Shift to the dev branch.
2. Clone this repository to your local machine.
3. Install dependencies by running `npm install` in the root directory.
4. Start the server by running `npm run server` in the root directory.
5. Start the client by running `npm run start` in the root directory and a separate terminal.
6. Open your browser and navigate to `http://localhost:3000`.
7. Use the Firebase Auth service for login and account registration.
8. Navigate to chats page.
9. Type a message in the input field and click the "Send" button to send a message.

### Firebase Configuration

Before running the app, make sure to add an `.env` file in the root directory of the project. This file should contain the necessary Firebase configuration values. Here's an example of how the `.env` file should be structured:

```
REACT_APP_GOOGLEAPIKEY=your-api-key
REACT_APP_AUTHDOMAIN=your-auth-domain
REACT_APP_PROJECTID=your-project-id
REACT_APP_STORAGEBUCKET=your-storage-bucket
REACT_APP_MESSAGESENDERID=your-sender-id
REACT_APP_APPID=your-app-id
REACT_APP_MEASUREMENTID=your-measurement-id
```
Replace `your-api-key`, `your-auth-domain`, `your-project-id`, `your-storage-bucket`, `your-sender-id`, `your-app-id` and `your-measurement-id` with the corresponding values from your Firebase project.

### Technologies Used

This app was built using the following technologies:

* React.js
* Redux Toolkit
* Socket.IO
* MongoDB
* GraphQL
* Firebase Auth
* Tailwind

### Key Features

* Real-time messaging: Messages are sent and received in real-time using GraphQL.
* State management: Redux Toolkit is used for state management, making it easy to manage and update the app's state.
* GraphQL integration: The app uses GraphQL to query and mutate messages on the server.
* Simple UI: The UI is minimal and easy to use, allowing users to focus on sending and receiving messages.
* Data storage: Messages are stored in a MongoDB database using GraphQL and MongoDB Compass/Mongoose.
* User authentication: Firebase Auth service is used for login and account registration.

This app was created by Shujaa Marwat. Feel free to contribute by submitting a pull request or reporting issues.
