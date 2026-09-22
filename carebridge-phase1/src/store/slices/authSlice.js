import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { tokenStorage, getErrorMessage } from "../../services/api";

const storedUser = (() => {
  try {
    const raw = localStorage.getItem("carebridge_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  user: storedUser,
  role: storedUser?.role || null,
  accessToken: tokenStorage.getAccess(),
  refreshToken: tokenStorage.getRefresh(),
  isAuthenticated: Boolean(tokenStorage.getAccess()),
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const roleToDashboard = {
  PATIENT: "/patient/dashboard",
  DOCTOR: "/doctor/dashboard",
  PHARMACY: "/pharmacy/dashboard",
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(credentials);
      tokenStorage.setTokens(data.access, data.refresh);

      // Some backends return the user on login; if not, fetch it separately.
      let user = data.user || null;
      if (!user) {
        const meRes = await authService.getCurrentUser();
        user = meRes.data;
      }

      return { user, access: data.access, refresh: data.refresh };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Invalid email or password."));
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Unable to load your profile."));
    }
  }
);

export const registerPatient = createAsyncThunk(
  "auth/registerPatient",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.registerPatient(payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Unable to register. Please check your details."));
    }
  }
);

export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.registerDoctor(payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Unable to register. Please check your details."));
    }
  }
);

export const registerPharmacy = createAsyncThunk(
  "auth/registerPharmacy",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await authService.registerPharmacy(payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Unable to register. Please check your details."));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      tokenStorage.clear();
      localStorage.removeItem("carebridge_user");
      state.user = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, access, refresh } = action.payload;
        state.status = "succeeded";
        state.user = user;
        state.role = user?.role || null;
        state.accessToken = access;
        state.refreshToken = refresh;
        state.isAuthenticated = true;
        localStorage.setItem("carebridge_user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload?.role || null;
        state.isAuthenticated = true;
        localStorage.setItem("carebridge_user", JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        // token invalid / expired — force logout
        tokenStorage.clear();
        localStorage.removeItem("carebridge_user");
        state.user = null;
        state.role = null;
        state.isAuthenticated = false;
      })
      .addMatcher(
        (action) =>
          [registerPatient.pending, registerDoctor.pending, registerPharmacy.pending].some(
            (t) => t.type === action.type
          ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          [registerPatient.fulfilled, registerDoctor.fulfilled, registerPharmacy.fulfilled].some(
            (t) => t.type === action.type
          ),
        (state) => {
          state.status = "succeeded";
        }
      )
      .addMatcher(
        (action) =>
          [registerPatient.rejected, registerDoctor.rejected, registerPharmacy.rejected].some(
            (t) => t.type === action.type
          ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export const getDashboardPathForRole = (role) => roleToDashboard[role] || "/login";
export default authSlice.reducer;
