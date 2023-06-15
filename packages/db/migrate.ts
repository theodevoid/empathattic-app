import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "./env";

const connectionString = env.DATABASE_POOL;
const migrationConnection = postgres(connectionString, { max: 1 });

const main = async () => {
  console.log("migrating...");
  await migrate(drizzle(migrationConnection), {
    migrationsFolder: "drizzle",
  });
  await migrationConnection.end();

  console.log("migration complete");
  process.exit(0);
};

void main();
