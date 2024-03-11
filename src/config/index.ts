const config = {
  port: Number(process.env.HTTP_PORT) || 8080,
  db: {
    connectionStr: process.env.DB_CONNECTION || "",
  },
  clientId: {
    customerSupport: process.env.CUSTOMER_SUPPORT_CLIENT_ID || "",
    shop: process.env.SHOP_CLIENT_ID || "",
  },
};

export default config;
