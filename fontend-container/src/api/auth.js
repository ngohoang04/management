import axios from "axios";

export async function loginUser(email, password) {
  const res = await axios.post("http://localhost:5000/api/login", {
    email,
    password,
  });
  return res.data;
}

export async function signupUser(name, email, password) {
  const res = await axios.post("http://localhost:5000/api/signup", {
    name,
    email,
    password,
  });
  return res.data;
}
