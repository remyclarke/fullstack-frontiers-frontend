# REACT STARTER WITH PROTECTED ROUTES

You can use this frontend and the [backend](https://github.com/10-3-pursuit/auth-express-login) repo as starters for a full stack project that will include login

In this Frontend app you will have a `ProtectedRoute.jsx` component that you will use to wrap around all components that require a user to be logged in.

The **ProtectedRoute** component works in a similar way to the `<BrowserRouter>` component where we wrap it around the `<App />` component in order to give the application more functionalilty. It works by checking if the user is authenticated before allowing access to certain routes. It uses a custom hook useAuth to check the authentication status by making a request to the server. If the user is authenticated (isAuthenticated is true), it renders the component the route is pointing to using `<Outlet context={{ user }} />`. If not authenticated, it redirects the user to the login page using `<Navigate to="/login" replace />`. During the authentication check, it displays a loading message.

In the `ProtectedRoute.jsx` component you will see a component called `<Outlet />`. This comes from `react-router-dom`. This is a signal that let's the app know, if I nest a route inside the `ProtectedRoute` component, please render it on the page if I pass the authentication tests. I can use it for various Routes
e.g.

```js
<ProtectedRoute>
    <Route path='/dashboard' element={<Dashboard />}>
    <Route path='/profile' element={<Profile />}>
</ProtectedRoute>
```

The backend to this application is located at [Auth-Express-Backend](https://github.com/10-3-pursuit/auth-express-login)

Also consult that readme to see what security precautions have been put into place as well as auth routes for the login and register.
