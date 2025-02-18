# Quiz App

A React-based quiz application featuring both multiple-choice and integer-type questions. Each question has a 30-second timer, and when the timer expires, the question is automatically skipped without awarding any points. Quiz attempt history is stored using IndexedDB via the `idb` library.

## Features

- **Multiple-Choice & Integer-Type Questions:**  
  Supports questions with options (multiple-choice) and questions that require a numerical answer.
- **Timed Quiz:**  
  Each question is timed with a 30-second countdown. If time expires before an answer is given, the question is auto-skipped.
- **Auto-Skip on Timeout:**  
  When the timer runs out, the current question is skipped without awarding any points.
- **Persistent History:**  
  Quiz attempt history is saved to IndexedDB, allowing you to review your past attempts.
- **Responsive UI:**  
  Built with custom UI components for buttons, cards, and card content to ensure a clean and responsive design.

## Prerequisites

- **Node.js:** Version 12 or later  
  [Download Node.js](https://nodejs.org/)

- **npm or yarn:** A package manager for installing dependencies.

## Installation

1.  **Clone the Repository:**

    ```bash
    git clone [https://github.com/UmraoBisht/quiz-app.git](https://github.com/UmraoBisht/quiz-app.git)
    cd quiz-app
    ```

2.  **Install Dependencies:**
    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Running the Project**
    To start the development server, run:

    Using npm:

    ```bash
    Copy
    Edit
    npm start
    ```

    Using yarn:

    ```bash
    Copy
    Edit
    yarn start
    ```

    This will launch the app in development mode. Open http://localhost:5173 in your browser to view it.
