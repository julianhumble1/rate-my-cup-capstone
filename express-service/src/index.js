import Config from "../src/config/Config.js"
import Database from "./db/Database.js";
import Server from "./server/Server.js";

import UserRoutes from "./routes/User.routes.js"
import CoffeeRoutes from "./routes/Coffee.routes.js"
import ReviewRoutes from "./routes/Review.routes.js"

Config.load()
const { PORT, HOST, DB_URI } = process.env;

const userRoutes = new UserRoutes();
const coffeeRoutes = new CoffeeRoutes();
const reviewRoutes = new ReviewRoutes();

const database = new Database(DB_URI);
database.connect();

const server = new Server(PORT, HOST, userRoutes, coffeeRoutes, reviewRoutes);
server.start()