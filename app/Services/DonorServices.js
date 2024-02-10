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

  // Details

  async getDonorDetails() {
    return await Api().get("/details");
  },
};
