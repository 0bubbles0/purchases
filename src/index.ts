import fastify from "fastify";

import config from "./config";
import routes from "./routes";

export const buildApp = async (opts = {}) => {
  const app = fastify(opts);
  // db

  // routes
  app.register(routes);

  return app;
};

// server:
const start = async () => {
  try {
    const app = await buildApp();

    await app.listen({ port: config.port }, (err, address) => {
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

// export default buildApp;
