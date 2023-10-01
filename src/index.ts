import fastify from "./server";
import { myDataSource } from "./libs/app-data-source";

// Load environment variables from .env file0
import { config } from 'dotenv';
config();


// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


// Run the server
const PORT = Number(process.env.PORT) || 3000; 

fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running on port ${address}`);
});