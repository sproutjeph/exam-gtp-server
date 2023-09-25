import dotenv from "dotenv";
dotenv.config();

const { env } = process as { env: { [key: string]: string } };

export const PORT = env.PORT || 8000;

export const MONGODB_URI = env.MONGODB_URI;

export const OPENAI_API_KEY = env.OPENAI_API_KEY;

export const ACCESS_TOKEN = env.ACCESS_TOKEN;
export const REFRESH_TOKEN = env.REFRESH_TOKEN;
export const ACCESS_TOKEN_EXPIRE = env.ACCESS_TOKEN_EXPIRE;
export const REFRESH_TOKEN_EXPIRE = env.REFRESH_TOKEN_EXPIRE;

export const ACTIVATION_SECRET = env.ACTIVATION_SECRET;

export const SMTP_HOST = env.SMTP_HOST || "587";

export const SMTP_PORT = env.SMTP_PORT;

export const SMTP_SERVER = env.SMTP_SERVER;
export const SMTP_MAIL = env.SMTP_MAIL;
export const SMTP_PASSWORD = env.SMTP_PASSWORD;

export const REDIS_URL = env.REDIS_URL;

export const CLOUD_NAME = env.CLOUD_NAME;
export const CLOUD_API_KEY = env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = env.CLOUD_API_SECRET;
