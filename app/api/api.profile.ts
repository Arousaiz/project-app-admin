import { instance } from "./api.config";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  contactNumber: string;
  address: Address;
}

export type Address = {
  id: string;
  city: string;
  street: string;
  house: number;
};

export type UpdateUserProfile = Partial<
  Pick<UserProfile, "id" | "firstName" | "lastName" | "email" | "contactNumber">
>;

export type UpdateAddress = Partial<Pick<Address, "city" | "street" | "house">>;

export const ProfileService = {
  fetchProfile(): Promise<UserProfile> {
    return instance.get("/profile").then((response) => {
      return response.data.data;
    });
  },

  editInfo(data: UpdateUserProfile) {
    return instance.put("/profile", data).then((response) => {
      return response.data;
    });
  },

  editAddress(data: UpdateAddress) {
    return instance.post("/profile/address", data).then((response) => {
      return response.data;
    });
  },
};
