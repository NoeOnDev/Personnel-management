process.loadEnvFile();

const {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

const env = {
  port: PORT,
  db: {
    host: DB_HOST,
    port: Number(DB_PORT),
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
  jwt: {
    secret: JWT_SECRET || "secret",
    expiresIn: JWT_EXPIRES_IN,
  },
};

export default env;
