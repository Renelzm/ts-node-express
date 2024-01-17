import { Router } from 'express';
import { AuthController } from './controller';
import { ValidarCampos } from '../middlewares/validar-campos';
import { check } from 'express-validator';
import { AuthService, EmailService} from '../services';
import { envs } from '../../config';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );
    const authservice = new AuthService(emailService);
    const controller = new AuthController(authservice);
    const validarCampos = new ValidarCampos();
    // Define routes
    router.post('/login', [

      // check('email', 'El correo es obligatorio').isEmail(),
      // validarCampos.ValidateExpressValidator,
      // validarCampos.ValidateCreateUserDTO,
    ],
    controller.loginUser ); 


    router.post('/register', [
      // check('nombre').toLowerCase(),
      // validarCampos.ValidateCreateUserDTO
    ],controller.registerUser);

    
    router.get('/validate-email/:token', controller.emailValidation);
    return router;
  }


}

// IMGS https://cdn.pixabay.com/photo/2017/10/29/01/23/icon-e-mail-2898669_1280.png 

