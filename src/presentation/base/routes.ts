import { Router } from 'express';
import { BaseController } from './controller';




export class BaseRoutes {


  static get routes(): Router {

    const router = Router();
    const controller = new BaseController();
    
    // Define routes
    router.post('/', controller.base);


    return router;
  }


}

