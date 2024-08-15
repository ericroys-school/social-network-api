import { connect, connection } from "mongoose";

//specify the endpoint uri to the connection
connect(process.env.MONGO_ENDPOINT);

//export the mongoose connection to be used by the api
export {connection};