import "dotenv/config"

export const envs = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string
}