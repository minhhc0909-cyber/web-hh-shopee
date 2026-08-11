module = {
  apps: [
    {
      name: "shopee-cashback-app",
      script: "./server/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
