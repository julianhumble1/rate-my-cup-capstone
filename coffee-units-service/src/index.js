import Config from "./config/config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";

Config.load()
const { PORT, HOST, DB_URI } = process.env;

const coffeeRoutes = new CoffeeRoutes();

const database = new Database(DB_URI);
database.connect();

const server = new Server(PORT, HOST, coffeeRoutes);
server.start()