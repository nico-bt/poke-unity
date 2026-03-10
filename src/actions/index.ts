import { login, logout } from "./auth";
import { addCard } from "./pokemon";

export const actions = {
  auth: {
    login,
    logout,
  },
  pokemon: {
    addCard,
  },
};
