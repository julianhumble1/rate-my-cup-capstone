import Config from "./config/config.js";
import Server from "./server/Server.js";

import CoffeeRoutes from "./routes/Coffee.routes.js"

Config.load()
const { PORT, HOST, DB_URI } = process.env;

const coffeeRoutes = new CoffeeRoutes();

const server = new Server(PORT, HOST, coffeeRoutes);
server.start()