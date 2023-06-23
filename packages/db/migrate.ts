import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "./env";

const connectionString = env.DATABASE_POOL;
const migrationConnection = postgres(connectionString, { max: 1 });

const main = async () => {
  console.log("migrating...");
  try {
    await migrate(drizzle(migrationConnection), {
      migrationsFolder: "drizzle",
    });
    await migrationConnection.end();

    console.log("migration complete");
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log((error as any)?.message);
  } finally {
    process.exit(0);
  }
};

void main();
