# Kanban Board Application

This project is an interactive Kanban board application built using **React JS** that dynamically groups and sorts tickets fetched from the provided API endpoint [QuickSell API](https://api.quicksell.co/v1/internal/frontend-assignment). The application allows users to view tickets grouped by status, user, or priority, and sort them by priority or title.

## Features

- **Dynamic Data Fetching**: Data is fetched from the API and displayed in real time.
- **Ticket Grouping**: Tickets can be grouped by **Status**, **User**, or **Priority**.
- **Ticket Sorting**: Tickets can be sorted by **Priority** (descending) or **Title** (ascending).
- **Persistent View**: The app remembers the user's grouping and sorting choices even after a page reload.
- **Responsive Design**: The Kanban board is fully responsive and visually appealing, resembling the provided UI design.
  
### Priority Levels:

- **Urgent** (Priority 4)
- **High** (Priority 3)
- **Medium** (Priority 2)
- **Low** (Priority 1)
- **No priority** (Priority 0)

## API Used

- **Endpoint**: [https://api.quicksell.co/v1/internal/frontend-assignment](https://api.quicksell.co/v1/internal/frontend-assignment)
- **Method**: `GET`
- **Data**: The API returns an array of tickets with properties like title, status, priority, and assigned user.

## Project Structure

```bash
quicksell_project/
|
|__ frontend/
|   |
|   |__ node_modules /
|   |__ public/
|   |__ src/
|   |    |__ assets/
|   |    |   |
|   |    |   |__ icons_FEtask /
|   |    |__ components/
|   |    |   |
|   |    |   |__ MainDisplay /
|   |    |   |__ UserAvatar /
|   |    |__ App.js
|   |    |__ index.js
|   |__ .gitignore
|   |__ package.json
```

## Installation and Setup

To run this project locally, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/yourusername/quicksell_project.git
cd frontend
```

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bask
npm start
```

The app will run at http://localhost:3000/

### Functionality

## Display Button:

The user can click the Display button to load the tickets from the API.

## Grouping Options:

By Status: Groups tickets based on their status (e.g., Open, In Progress, Done).

By User: Groups tickets based on the assigned user.

By Priority: Groups tickets based on their priority level.

## Sorting Options:

By Priority: Sorts tickets in descending order of priority (Urgent > High > Medium > Low > No priority).

By Title: Sorts tickets alphabetically by their title.

## State Persistence:

The application remembers the user's selection of grouping and sorting options, even after a page reload.

### How It Works

## Fetching Data:

The api.js service is responsible for fetching the ticket data from the QuickSell API. The data is then passed to the Kanban board component.

## Grouping and Sorting:

When the user selects a grouping or sorting option, the Kanban board reorganizes the tickets according to the user's choice.

## LocalStorage:

The app uses localStorage to store the user's preferences for grouping and sorting, ensuring that their selections are preserved between page reloads.

## CSS Styling:

The entire UI is styled using pure CSS (no external libraries like Bootstrap or Material UI) to match the provided design.

### Technologies Used

React JS: Core framework for building the UI.

JavaScript (ES6): Used for scripting and logic.

CSS: Custom styling for the UI.

localStorage: Used to persist user state across page reloads.

REST API: Fetches data from the QuickSell API.

