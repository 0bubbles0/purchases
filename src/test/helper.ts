// // helper.ts

// import fastify from "fastify";
// import fp from "fastify-plugin";
// import buildApp from "../index";

// // Set up jest lifecycle methods:

// export function build() {
//   const app = fastify();

//   beforeAll(async () => {
//     void app.register(fp(buildApp));
//     await app.ready();
//   });

//   afterAll(() => app.close());

//   return app;
// }
