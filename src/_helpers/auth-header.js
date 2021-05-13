import { store } from "../_store";

export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    if (store.state.account.jwtToken) {
      return { Authorization: "Bearer " + store.state.account.jwtToken };
    }
    return {};
  }
}
