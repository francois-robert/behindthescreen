import axios from "axios";

export const login = (email : string, password : string) => {
  return axios
    .post('/api/users/login', {email: email, password: password})
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })

}

export const logout = () => {
  localStorage.removeItem("user");
}

  /*
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
  */
