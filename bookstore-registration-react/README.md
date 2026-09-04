# BookStore Member Registration

React + Vite + Tailwind CSS implementation of the member registration screen.

## Features

- General User registration
- Student registration
- Store / Business registration
- Step-by-step registration UI
- Responsive Tailwind CSS design
- Client-side validation with React Hook Form
- Student ID card upload validation
- Legal document upload validation
- Registration success screen

## Requirements

- Node.js 18+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Backend integration

The current project is frontend-only. The `onSubmit` function in `src/App.jsx` currently logs the registration data.

Replace that logic with a REST API request when connecting to a backend.

Example:

```js
const formData = new FormData();

formData.append("memberType", memberType);
// append the other form fields...

await fetch("http://localhost:8080/api/members/register", {
  method: "POST",
  body: formData,
});
```
