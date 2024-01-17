import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { BaseRoutes } from './base/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    
    //  Define routes
    //  Basic route (delete)
    router.use('/api/base', BaseRoutes.routes)

    //  APP ROUTES
    router.use('/api/auth', AuthRoutes.routes);
    



    return router;
  }


}

