import axios from 'axios'

export const app = axios.create({
  baseURL: 'http://10.100.0.2:3010'
})

export const createSession = async (mat, password) => {
  return app.post("/escolas/users/professores/login", {mat, password});
};
