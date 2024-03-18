# REACT STARTER WITH PROTECTED ROUTES

You can use this frontend and the [backend](https://github.com/10-3-pursuit/auth-express-login) repo as starters for a full stack project that will include login

In this Frontend app you will have a `ProtectedRoute.jsx` component that you will use to wrap around all components that require a user to be logged in.

The component is called a Higher Order component. It works in a similar way to the `<BrowserRouter>` component where we wrap it around the `<App />` component in order to give the application more functionalilty

In the `ProtectedRoute.jsx` component you will see something called `<Outlet />`. This comes from `react-router-dom`. This is a signal that let's a component know, if I nest something inside the `ProtectedRoute` component, please render it on the page.

The backend to this application is located at [Auth-Express-Backend](https://github.com/10-3-pursuit/auth-express-login)

Also consult that readme to see what security precautions have been put into place as well as auth routes for the login and register.
