import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    console.log('We are in registration method in userAPI.js');
    console.log(`${process.env.REACT_APP_API_URL},${email},${password}`);

  const {data} = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });
localStorage.setItem('token',data.token)  //saving token
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
    console.log('We are in login method in userAPI.js');

  const {data}  = await $host.post("api/user/login", { email, password });
  localStorage.setItem('token',data.token)
  return jwtDecode(data.token);
};

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth' )
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token);
};
