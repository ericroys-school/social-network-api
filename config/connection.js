import mongoose from "mongoose";
import "dotenv/config";

//specify the endpoint uri to the connection
mongoose.connect(process.env.MONGO_ENDPOINT);
const connection = mongoose.connection;

//export the mongoose connection to be used by the api
export {connection};