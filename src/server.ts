import fastify from "fastify";

import config from "./config";
import routes from "./http/routes";

// App:
export const buildApp = async (opts = {}) => {
  const app = fastify(opts);

  // @todo: logging, observability

  // db

  // routes
  app.register(routes);

  return app;
};

// Server:
const start = async () => {
  try {
    const app = await buildApp();

    await app.listen({ port: config.port });
    console.log(`Server listening at port: ${config.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();


"x-user-id": string