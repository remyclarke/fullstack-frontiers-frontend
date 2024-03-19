# REACT STARTER WITH PROTECTED ROUTES

## Getting Started

You can use this frontend and the [backend](https://github.com/10-3-pursuit/auth-express-login) repo as starters for a full stack project that will include login

**Steps:**

- Create a parent folder
- `fork` both repos
  - [frontend](<(https://github.com/10-3-pursuit/auth-react-login)>)
  - [backend](https://github.com/10-3-pursuit/auth-express-login)
- `clone` both forked repos into the parent folder
- Use the `env.example` in the backend to set up your postgresql database
- Postgresql tables have been included in `db/schema.sql` to define the user.
- If you want the user to have extra fields you must update the schema and update the `db/seed.sql` files properly.
- There are commented areas in the code where you must replace things such as the database name etc.

## Demo User

On the Login page (component) there is a `DemoUser` button where the login functionality has been already created. It runs a function that logs in using the credentials of a seeded user called `demo` that has a password of `password` which you can see in the `handleDemoSignIn` function in `Login.jsx`.

## Security

Most of the security is being handled on the backend. But there are two pieces that are also used on the frontend as well in this app.

#### ProtectedRoute Component

In this Frontend app you will have a `ProtectedRoute.jsx` component that you will use to wrap around all component routes that require a user to be logged in.

The `ProtectedRoute` component works in a similar way to the `<BrowserRouter>` component where we wrap it around the `<App />` component in order to give the application more functionalilty. It works by checking if the user is authenticated before allowing access to certain routes. It uses a custom hook `useAuth` to check the authentication status by making a request to the server. If the user is authenticated (isAuthenticated is true), it renders the component the route is pointing to using `<Outlet context={{ user }} />`. If not authenticated, it redirects the user to the login page using `<Navigate to="/login" replace />`. During the authentication check, it displays a loading message.

In the `ProtectedRoute` component you will see a component called `<Outlet />`. This comes from `react-router-dom`. This is a signal that let's the app know, if I nest a route inside the `ProtectedRoute` component, please render it on the page if I pass the authentication tests. I can use it for various Routes
e.g.

```js
<ProtectedRoute>
    <Route path='/dashboard' element={<Dashboard />}>
    <Route path='/profile' element={<Profile />}>
</ProtectedRoute>
```

#### XSRF

In the `Login.jsx` and `Register.jsx` components, the XSRF token is included in the request headers.

The extra XSRF (Cross-Site Request Forgery) token is used as a security measure to protect against CSRF attacks. A CSRF attack forces a logged-in user to execute unwanted actions on a web application in which they're currently authenticated. By requiring an XSRF token with each request, your application ensures that the request is coming from a legitimate source (i.e., your application) and not from a malicious site.

The XSRF token is extracted from cookies in your browser, and sent with requests to perform actions that change the state on the server, such as login and registration. This token is validated by the server to ensure it matches the expected value, thereby preventing CSRF attacks.

[CSRF - Cross Site Resource Forgery Video](https://www.youtube.com/watch?v=eWEgUcHPle0)

#### Forms

For every form, you will need to include CSRF credentials. You will need to add the csrf token from the cookie, add the correct method and update the options object. The rest of the fetch should be as you already know. See `Login.jsx` or `Register.jsx` See code below.

```js
const csrfToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('XSRF-TOKEN='))
  .split('=')[1] // Extract CSRF token from cookies

const options = {
  method: 'POST', // could be PUT
  headers: {
    'Content-Type': 'application/json',
    'CSRF-Token': csrfToken, // Include CSRF token in request headers
  },
  credentials: 'include', // Important: Include cookies in the request
  body: JSON.stringify(user),
}
```

<hr />

### Go to Backend

Also consult [Auth-Express-Backend Readme](https://github.com/10-3-pursuit/auth-express-login) to see what security precautions have been put into place as well as auth routes for the login and register.
