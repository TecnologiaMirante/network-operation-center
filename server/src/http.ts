import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { router } from "./routes/routes";
import { Server } from "socket.io";

const app = express();

// // Configurando o CORS --------------------------------------------------------
// // Adicionando a lista de IP's permitidos a acessar a API.
// const allowedOrigins = ["http://localhost:53264/", "http://192.168.6.26:53264/"];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

// app.use(cors());

app.use(express.json());

app.use("/files", express.static(path.resolve(__dirname, '..','uploads')))

app.use(router);

const serverHttp = http.createServer(app);
const io = new Server(serverHttp);
export { serverHttp, io };