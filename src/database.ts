import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URI, dbOptions);

const connect = mongoose.connection;

connect.once("open", () => {
    console.log("Mongodb connection stabished");
});

connect.on("error", err => {
    console.log(err)
    process.exit(0);
});