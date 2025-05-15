import { error } from "console";
import { instance } from "./api.config";
import { redirect } from "react-router";

export type AuthInterface = {
  username: string;
  password: string;
};

export const AuthService = {
  login(data: AuthInterface): Promise<string> {
    return instance.post("/login", data).then((response) => {
      return response.data.data.token;
    });
  },

  register(data: AuthInterface): Promise<string> {
    return instance.post("/register", data).then((response) => {
      return response.data.message;
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
