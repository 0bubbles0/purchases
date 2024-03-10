const config = {
  port: Number(process.env.HTTP_PORT) || 8080,
  db: {
    connectionStr: process.env.DB_CONNECTION || "",
  },
};

export default config;
