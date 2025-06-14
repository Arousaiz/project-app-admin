import axios from "axios";
import { instance } from "./api.config";

export type AuthInterface = {
  username: string;
  password: string;
};

export type UserPayload = {
  userId: string;
  username: string;
  role: string;
};

export const AuthService = {
  login(data: AuthInterface) {
    return instance.post("/login", data).then((response) => {
      return response;
    });
  },

  register(data: AuthInterface): Promise<string> {
    return instance.post("/register", data).then((response) => {
      return response?.data?.message;
    });
  },

  checkAuth(): Promise<UserPayload> {
    return axios
      .post(
        "http://localhost:3000/me",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        return response?.data;
      });
  },

  logout() {
    return instance.post("logout");
  },
};

// example of a request
// const token = session.get("token");
//     const data = instance.get('/profile', {
//       headers: {'Authorization': `Bearer ${token}`}})
//     console.log(JSON.stringify(data));
