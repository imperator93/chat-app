import { User } from "../Models/user.model";

export const saveToLocalStorage = (itemName: string, item: User[]) => {
  localStorage.setItem(itemName, JSON.stringify(item));
};
