import  express from 'express';
import  morgan from 'morgan';
import  cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import  bodyParser from "body-parser";
import "reflect-metadata";
import  {User}  from "./entity/User";
import  resolvers  from './grapql/user.resolver';
import  typeDefs  from './grapql/shema';
import {createConnection, Connection} from 'typeorm';
import  dotenv from 'dotenv';
dotenv.config();

import { connected } from 'process';

const app = express();
//createConnection();
async function intializeDB (): Promise<Connection> {
    const connection = await createConnection()
    return connection;
  }
  intializeDB().then(connected => { console.log('Connected to DB');})
  .catch((err: any) => {
    console.log(`DB connection error. Please make sure DB is running. ${err}`);
    // process.exit();
});
// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const server = new ApolloServer({
    typeDefs,
    resolvers,
      context: req  => ({ req, User})
    });
    
    server.applyMiddleware({ app });
    
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )