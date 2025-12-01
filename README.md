# Contact Manager Application

A full-stack contact management application built with React, Bun, and SQLite. Organize and manage your contacts with ease using group-based filtering and a clean, modern interface.

## Features

- **Add Contacts** - Create new contacts with name, email, phone number, address, and group assignment
- **View Contacts** - Display all contacts in an organized list/grid view
- **Edit Contacts** - Update existing contact information
- **Delete Contacts** - Remove contacts from your database
- **Filter by Group** - Quickly filter contacts by group (Work, Family, Friends, etc.)
- **Data Persistence** - All contacts are saved to a SQLite database
- **Responsive Design** - Built with Tailwind CSS for a modern, responsive interface

## Tech Stack

- **Frontend:** React with TypeScript/JavaScript
- **Backend:** Bun
- **Database:** SQLite with Prisma ORM
- **Styling:** Tailwind CSS
- **Runtime:** Bun

## Project Structure

```
.
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── components/
│   │   ├── ContactCard.jsx    # Individual contact display
│   │   ├── ContactList.jsx    # List of contacts
│   │   ├── AddContactForm.jsx # Create/edit form
│   │   └── GroupFilter.jsx    # Group filtering
│   ├── pages/
│   └── App.jsx                # Main app component
├── server.js                  # Express backend & API endpoints
├── package.json
└── README.md
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd contact-manager
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up the database:**
   ```bash
   bun run prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   bun dev
   ```

   The application will be available at `http://localhost:3000`

## Production Build

To create a production build and run the server:

```bash
bun start
```

## API Endpoints

All API endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Fetch all contacts |
| POST | `/api/contacts` | Create a new contact |
| PUT | `/api/contacts/:id` | Update an existing contact |
| DELETE | `/api/contacts/:id` | Delete a contact |

### Example API Usage

**Get all contacts:**
```bash
GET /api/contacts
```

**Create a new contact:**
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "group": "Work",
  "address": "123 Main St"
}
```

**Update a contact:**
```bash
PUT /api/contacts/1
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1-555-0456",
  "group": "Family",
  "address": "456 Oak Ave"
}
```

**Delete a contact:**
```bash
DELETE /api/contacts/1
```

## Database Schema

Contacts are stored with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Auto-generated primary key |
| name | String | Full name of the contact |
| email | String | Email address |
| phone | String | Phone number |
| group | String | Contact group (Work, Family, Friends, etc.) |
| address | String (Optional) | Contact address |
| createdAt | DateTime | Auto-generated timestamp |

## Component Architecture

The application follows a modular component structure:

- **ContactCard** - Displays individual contact with edit/delete buttons
- **ContactList** - Renders a list of ContactCard components
- **AddContactForm** - Modal/form for creating and editing contacts
- **GroupFilter** - Dropdown/buttons to filter contacts by group
- **App** - Main component managing state and data flow

## Error Handling

The application includes comprehensive error handling:

- Try-catch blocks on all async API calls
- User-friendly error messages
- Console logging for debugging
- Network error detection and handling

## Development

### Testing the API

Use Postman, Thunder Client, or cURL to test the API endpoints during development.

### Viewing Database

To inspect the SQLite database directly:

```bash
bun run prisma studio
```

This opens Prisma Studio where you can view and manage your data.

### Debugging

- Check the browser DevTools Console for frontend errors
- Check the browser DevTools Network tab to see API requests/responses
- Check the terminal for backend server errors

## Getting Started Tips

1. Start the backend server first - it handles all data operations
2. Test your API endpoints with a tool like Postman before connecting the frontend
3. Use `console.log()` to verify data is flowing correctly between frontend and backend
4. Keep the browser DevTools open during development to catch errors early

## Future Enhancements

- Search functionality
- Contact image/avatar support
- Export contacts to CSV
- Import contacts from CSV
- Multiple contact sorting options
- Dark mode theme

## License

This project is part of a Full-Stack Development Bootcamp assessment.

## Support

For issues or questions, please check the browser console and server logs for error messages and stack traces.