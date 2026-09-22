import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store";
import { setOnAuthExpired } from "./services/api";
import { logout } from "./store/slices/authSlice";

// If a refresh token expires or is rejected anywhere in the app, force a clean logout.
setOnAuthExpired(() => {
  store.dispatch(logout());
  if (window.location.pathname !== "/login") {
    window.location.assign("/login");
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
