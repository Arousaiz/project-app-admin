import { instance } from "./api.config";

export class UserQuery {
  offset: string = "0";
  limit: string = "10";
  constructor(params: { [k: string]: string }) {
    if (params?.offset) this.offset = params.offset;
    if (params?.limit) this.limit = params.limit;
  }
}

export const UserService = {
  fetchUsers(query: UserQuery, token: string) {
    return instance
      .get(`/users?limit=${query.limit}&offset=${query.offset}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error.data));
  },
};
