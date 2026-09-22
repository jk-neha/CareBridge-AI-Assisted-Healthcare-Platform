import api from "./api";

const authService = {
  login: (credentials) => api.post("/api/account/login/", credentials),

  registerPatient: (payload) =>
    api.post("/api/account/patients/register/", payload),

  registerDoctor: (payload) =>
    api.post("/api/account/doctors/register/", payload),

  registerPharmacy: (payload) =>
    api.post("/api/account/pharmacies/register/", payload),

  getCurrentUser: () => api.get("/api/account/me/"),

  refreshToken: (refresh) =>
    api.post("/api/account/token/refresh/", { refresh }),
};

export default authService;
