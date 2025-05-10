# Backend Plan for MigAid

Based on the project requirements and the current state of the `backend/` directory (which is empty), this plan outlines the steps to build a simple Javascript backend that acts as an intermediary between the React frontend and the Gemini API, with Firebase solely handling user authentication.

## 1. Project Setup

*   Initialize a Node.js project in the `backend/` directory.
*   Install necessary dependencies: Express (for the web server), Firebase Admin SDK (for authentication), and a library for making HTTP requests (e.g., `axios` or `node-fetch`) to interact with the Gemini API.

## 2. Server Structure

*   Create an entry point file (e.g., `index.js` or `server.js`).
*   Set up an Express application.
*   Configure basic middleware (e.g., body-parser for JSON requests).

## 3. Firebase Authentication Integration

*   Initialize the Firebase Admin SDK with appropriate credentials.
*   Create API endpoints for authentication:
    *   `POST /api/auth/signup`: Receives user credentials from the frontend, uses Firebase Admin SDK to create a new user. Returns success/failure.
    *   `POST /api/auth/login`: Receives user credentials, uses Firebase Admin SDK to verify credentials (or relies on frontend handling login via client SDK and sending token). If using tokens, verify the token on the backend for protected routes.

## 4. Gemini API Interaction Module

*   Create a dedicated module (e.g., `geminiService.js`) to handle all communication with the Gemini API.
*   This module will contain functions for sending prompts to the Gemini API.
*   Crucially, this module will manage the "system prompts" required for each specific functionality to guide the Gemini model's behavior (e.g., a system prompt for chat, a different one for form filling).

## 5. Core Functionality Endpoints

*   Create API endpoints corresponding to the core features, all of which will utilize the `geminiService`:
    *   `POST /api/chat`: Receives user message and context (like language) from frontend. Calls `geminiService` with the chat system prompt and user message. Returns Gemini's response.
    *   `POST /api/form-fill`: Receives user input for forms. Calls `geminiService` with the form-filling system prompt and user data/questions. Returns AI guidance or next steps.
    *   `POST /api/cultural-info`: Receives requests for cultural explanations or deyim/atasözü lookups. Calls `geminiService` with the cultural context system prompt. Returns relevant information.
    *   `POST /api/integration-roadmap`: Receives user progress/goals. Calls `geminiService` with the integration system prompt. Returns personalized roadmap steps or score updates.
    *   `POST /api/skill-match`: Receives user skills/experience. Calls `geminiService` with the skill-matching system prompt and job market context (if available/needed). Returns matching job types or training suggestions.

## 6. System Prompts

*   Define the specific system prompts for each functionality within the backend code or configuration. These prompts are key to making Gemini behave as required for each feature (e.g., ensuring the chat is multi-lingual, the form filler is step-by-step, the cultural module includes deyimler/atasözleri).

## 7. Error Handling and Security

*   Implement basic error handling for API calls (Firebase, Gemini) and invalid requests.
*   Ensure API keys (Gemini, Firebase Admin) are stored securely (e.g., environment variables).
*   Consider adding middleware to protect certain routes, verifying user authentication tokens received from the frontend after login.

## Backend Architecture Diagram

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant Firebase
    participant Gemini API

    Frontend->>Backend: User Action (e.g., Send Chat Message)
    activate Backend
    Backend->>Firebase: Authenticate User (if needed)
    alt Authentication Success
        Firebase-->>Backend: Auth Token/Status
        Backend->>Gemini API: Send Prompt (with System Prompt)
        activate Gemini API
        Gemini API-->>Backend: AI Response
        deactivate Gemini API
        Backend-->>Frontend: AI Response
    else Authentication Failed
        Firebase-->>Backend: Error
        Backend-->>Frontend: Authentication Error
    end
    deactivate Backend

    Frontend->>Backend: User Action (e.g., Fill Form Step)
    activate Backend
    Backend->>Gemini API: Send Prompt (with Form System Prompt + User Data)
    activate Gemini API
    Gemini API-->>Backend: AI Guidance/Next Step
    deactivate Gemini API
    Backend-->>Frontend: AI Guidance/Next Step
    deactivate Backend

    Frontend->>Backend: User Action (e.g., Get Cultural Info)
    activate Backend
    Backend->>Gemini API: Send Prompt (with Cultural System Prompt)
    activate Gemini API
    Gemini API-->>Backend: Cultural Info
    deactivate Gemini API
    Backend-->>Frontend: Cultural Info
    deactivate Backend

    % ... similar flows for Integration Roadmap and Skill Matching