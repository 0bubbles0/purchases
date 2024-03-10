import fastify from "fastify";

import config from "./config";
import routes from "./routes";

const server = fastify();

// db

// routes
server.register(routes);

// server:
const start = async () => {
  try {
    await server.listen({ port: config.port }, (err, address) => {
      if (err) {
        throw err;
      }
      console.log(`Server listening at ${address}`);
      console.log("pooort", process.env.HTTP_PORT);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
