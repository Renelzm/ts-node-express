import { envs } from './config/envs';
import { MongoDatabase, dbConnection } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async()=> {
  main();
})();


async function main() {

  dbConnection.Mongo()

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}