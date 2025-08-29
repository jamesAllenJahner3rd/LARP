import { config } from "dotenv";
config({ path: "./.env" }); // Loads .env from current working directory

const prismaConfig = {
  schema: "./src/prisma/schema.prisma",
};
export default prismaConfig;
