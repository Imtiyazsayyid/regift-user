import Api from "./Api";

export default {
  async login(payload) {
    console.log({ payload });
    return await Api().post("auth/login", payload);
  },

  async getAccessToken(refreshToken) {
    return await Api().post(`auth/access-token`, {
      refreshToken,
    });
  },

  async register(payload) {
    return await Api().post("register", payload);
  },

  async deleteDonor(params) {
    return await Api().get("/delete", { params });
  },

  async sendOTP(payload) {
    return await Api().post("send-otp", payload);
  },

  async verifyOTP(payload) {
    return await Api().post("verify-otp", payload);
  },

  async resetPassword(payload) {
    return await Api().post("reset-password", payload);
  },

  // Details
  async getDonorDetails() {
    return await Api().get("/details");
  },

  // Donate
  async getAllDonatedItems(params) {
    return await Api().get("/donated-items", { params });
  },
  async saveDonatedItem(payload) {
    return await Api().post("/donated-item", payload);
  },

  // Category
  async getAllCategories(params) {
    return await Api().get("/categories", { params });
  },
};
