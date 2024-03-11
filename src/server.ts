import fastify from "fastify";
import { MongoClient } from "mongodb";
// import db from "@fastify/mongodb";

import db from "./db";
import config from "./config";
// import routes, { buildRouter } from "./http/routes";
import { buildRouter } from "./http/routes";

// App:
// @todo: pass in config param
export const buildApp = async (dbClient: MongoClient, opts = {}) => {
  const app = fastify(opts);

  // @todo: logging, observability

  // db
  // const mongoClient = "buildMongoClient(config)";
  await db.connect(dbClient);
  const purchaseRepository = db.buildPurchaseRepository(dbClient);
  // app.register(db, { url: config.db.connectionStr, forceClose: true });

  // routes
  const service = "buildPurchaseService(config, purchaseRepository)";
  // counst router = buildRouter(config, service)
  const router = buildRouter(purchaseRepository);

  // app.register(routes);
  app.register(router);
  // @todo: cors!

  return app;
};

// Server:
const start = async () => {
  const dbClient = new MongoClient(config.db.connectionStr);

  try {
    const app = await buildApp(dbClient);

    await app.listen({ port: config.port });
    console.log(`Server listening at port: ${config.port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  // finally {
  //   await dbClient.close();
  //   console.log("Disconnected database");
  // }
};

start();
