# MigAid Backend

This is the backend API for MigAid, a platform that helps migrants adapt to life in Türkiye through AI assistance. The backend uses Express.js, Firebase Authentication, and the Gemini API.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase project with Authentication enabled
- Google Gemini API key

### Installation

1. Clone the repository
2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the backend directory with the following variables:

```
# Firebase Configuration
# For development, paste your Firebase service account JSON here (escaped as a single line)
# FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}

# Or create a serviceAccountKey.json file in the backend directory (don't commit this file)

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

5. Start the development server:

```bash
npm run dev
```

## API Endpoints

All API endpoints require authentication except for the auth endpoints.

### Authentication

- **POST /api/auth/signup**

  - Create a new user account
  - Request Body: `{ "email": "user@example.com", "password": "password123", "displayName": "John Doe" }`
  - Response: `{ "success": true, "uid": "user-id", "message": "User created successfully" }`

- **POST /api/auth/verify-token**
  - Verify a Firebase ID token
  - Request Body: `{ "idToken": "firebase-id-token" }`
  - Response: `{ "success": true, "uid": "user-id", "email": "user@example.com" }`

### Chat

- **POST /api/chat**

  - Send a message to the AI assistant
  - Request Body: `{ "prompt": "Your message here", "language": "en" }`
  - Response: `{ "success": true, "response": "AI response text" }`

- **POST /api/chat/stream**
  - Send a message to the AI assistant with streaming response (Server-Sent Events)
  - Request Body: `{ "prompt": "Your message here", "language": "en" }`
  - Response: Stream of events with chunks of the response

### Form Filling Assistance

- **POST /api/form-fill**
  - Get guidance on filling out forms
  - Request Body: `{ "prompt": "How do I fill out this section?", "formType": "Residence Permit", "language": "en" }`
  - Response: `{ "success": true, "response": "AI guidance text" }`

### Cultural Information

- **POST /api/cultural-info**
  - Get information about Turkish culture, idioms, and proverbs
  - Request Body: `{ "prompt": "What does 'Damlaya damlaya göl olur' mean?", "language": "en" }`
  - Response: `{ "success": true, "response": "AI explanation text" }`

### Integration Roadmap

- **POST /api/integration-roadmap**
  - Get a personalized integration roadmap
  - Request Body: `{ "prompt": "What should I do next?", "background": "I'm a software engineer from Syria", "goals": "I want to work in tech in Istanbul", "language": "en" }`
  - Response: `{ "success": true, "response": "AI roadmap text" }`

### Skill Matching

- **POST /api/skill-match**
  - Match skills with job opportunities
  - Request Body: `{ "prompt": "What jobs can I apply for?", "skills": "Marketing, social media management", "experience": "3 years as marketing specialist", "language": "en" }`
  - Response: `{ "success": true, "response": "AI job matching text" }`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

To get the Firebase ID token, use the Firebase Authentication client SDK in your frontend.

## Error Handling

All endpoints return standard error responses:

```json
{
  "error": "Error message"
}
```

With appropriate HTTP status codes:

- 400: Bad Request (missing required fields)
- 401: Unauthorized (invalid or missing token)
- 500: Server Error (unexpected errors)

## Development

### Running the Server

For development with auto-reload:

```bash
npm run dev
```

For production:

```bash
npm start
```
