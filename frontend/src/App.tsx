// Updated Functional Requirements:

import Login from "./components/Register/Login"
import Register from "./components/Register/Register"

// The user shall be presented with a login page by default.

// The user shall be able to navigate to the registration page if not registered.

// The user shall be able to input a username, email, and password on the registration form.

// The registration form shall validate required fields and email format before submission.

// Upon successful registration, the user shall be redirected to the login page.

// The login form shall accept email/username and password inputs.

// The login form shall validate that inputs are not empty before submission.

// On successful login via fake API, the user shall be redirected to a protected page.

// If login fails, an error message shall be displayed.

// The authentication state shall be managed using Redux.

// The system shall store the user session using Redux and optionally localStorage.

// The app shall restrict access to authenticated routes.

// The user shall be able to log out and be redirected to the login page.

// Form submission shall show loading indicators while awaiting API response.

// Updated Non-Functional Requirements:

// The application shall respond to user actions within 2 seconds.

// The forms shall be mobile-responsive and accessible.

// Redux shall be used for global state management of authentication.

// UI feedback (e.g., success/error messages, spinners) shall be consistent.

// User data shall be cleared from Redux upon logout.

// The codebase shall be modular, reusable, and maintainable.

// Network errors or fake API failures shall be handled gracefully.

// The application shall support future integration with real APIs with minimal changes.

// The interface shall follow modern UI/UX principles.

// All navigation shall use client-side routing without full page reloads.


function App() {

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center">
       <Login/>
   </div>
    </>
  )
}

export default App
