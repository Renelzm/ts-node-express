import {Request, Response} from 'express'
import { AuthService } from '../services/auth.service';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';


export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) { }
  
    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
      } 
    
        registerUser = (req: Request, res: Response) => {
        const [error, registerDto] = RegisterUserDto.create(req.body); // DESESTRUCTURACION
        if ( error ) return res.status(400).json({error})
    
    
        this.authService.register(registerDto!)
          .then( (user) => res.json(user) )
          .catch( error => this.handleError(error, res) );
          
      }
    

        loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if ( error ) return res.status(400).json({error})

        this.authService.login(loginUserDto!)
        .then( (user) => res.json(user))
        .catch( (err) =>  this.handleError(err, res) );
        }
     
   

        emailValidation = (req: Request, res: Response) => {
        const {token} = req.params
        this.authService.validateEmail( token )
        .then( () => res.json('Email validado') )
        .catch( error => this.handleError(error, res) );
    };

}