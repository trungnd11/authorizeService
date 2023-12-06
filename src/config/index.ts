import dotenv from "dotenv";
dotenv.config();

const config = {
  jwt: {
    secret: process.env.JWT_SECRET,
    secretRefresh: process.env.JWT_SECRET_REFRESH
  },
  port: process.env.PORT || 8087,
  databaseUri: process.env.MONGO_URI
};

export default config;