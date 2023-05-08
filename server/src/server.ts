import { serverHttp } from "./http";
import "./websocket";

const port = process.env.PORT || 3011

// Como criamos o server http utilizando o express, é possível utilizar o método "listen" do express
serverHttp.listen(port, () => {
  console.log("Link Start! \u{1F60E} \u{1F44D}")
})

// ----------------------------

/**
 * MyMethod
 * * Important information is highlighted
 * ! Deprecated method, do not use
 * ? Should this method be exposed in the public API?
 * TODO: refactor this method so that it conforms to the API
 * @param myParam The Parameter for this method
*/

























// // import express from "express";
// // import { router } from "./routes/routes";
// // import cors from "cors";
// // import path from "path";

// // const app = express();

// // // Configurando o CORS --------------------------------------------------------
// // // Adicionando a lista de IP's permitidos a acessar a API.
// // const allowedOrigins = ["http://localhost:53264/"];

// // const options: cors.CorsOptions = {
// //     origin: allowedOrigins
// // };
// // app.use(cors());
// // // app.use(cors(options));

// // // ---------------------------------------------------------------------------

// // app.use(express.json());

// // // Pasta aonde os uploads serão armazenados -----------------------------------
// // app.use("/files", express.static(path.resolve(__dirname, '..','uploads')))

// // app.use(router);

// // const port = process.env.PORT || 3010

// // app.listen(port, () => {
// //   console.log("Link Start! \u{1F60E} \u{1F44D}")
// // })
