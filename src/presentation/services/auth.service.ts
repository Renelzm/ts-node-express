import { JwtGenerator, envs } from '../../config';
import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { UserModel } from '../../data';
import {CustomError, LoginUserDto, RegisterUserDto, UserEntity} from '../../domain'
import { EmailService } from './email.service';


export class AuthService {
    // DI - Email Service
    
    constructor(
        private readonly emailService: EmailService,
        ) {
    }

    public async register( registerUserDto: RegisterUserDto){ 
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if ( existUser ) throw CustomError.badRequest('Email already exist');
        try {
            const user = new UserModel(registerUserDto);
   
            
            // BCRIPT CONTRASEÑA
            user.password = bcryptAdapter.hash(registerUserDto.password);
            await user.save();

            // JWT
            const token = await JwtGenerator.generateToken({ id: user.id, role: user.role})
            if (!token) throw CustomError.internalServer('Error while creating JWT')
      

            // EMAIL CONFIRM
            await this.sendEmailValidationLink( user.email, user.nombre);

            const {  password, ...userEntity} = UserEntity.fromObject(user);
            return {
                user: userEntity,
                token
            
            };
        } catch (error) {
          throw CustomError.internalServer(`${error}`)
        }
    }

    public async login( loginUserDto: LoginUserDto){
        const findUser = await UserModel.findOne({ email: loginUserDto.email}).select('+password');
        if ( !findUser ) throw CustomError.badRequest('Credenciales no válidas');
        const {  password, ...userEntity} = UserEntity.fromObject(findUser);
        const isValidPassword = bcryptAdapter.compare(loginUserDto.password, password);
        if ( !isValidPassword ) throw CustomError.badRequest('Credenciales no válidas');
        
        try {
            const token = await JwtGenerator.generateToken({ id: userEntity.id, role: userEntity.role})
            if (!token) throw CustomError.internalServer('Error while creating JWT')
            await JwtGenerator.validateToken(`${token}`)         
            return {user: userEntity, token};
        } 
        catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
       
        
    }
    private async sendEmailValidationLink( email: string, nombre: string){
        const token = await JwtGenerator.generateToken({ email });
        if ( !token ) throw CustomError.internalServer('Error getting token');
        const link =`${ envs.WEBSERVICE_URL }/auth/validate-email/${token}`;
        const htmlBody = `

        <h1 style="color: #004080;">Validación de correo electrónico</h1>
        <p>Estimado/a ${nombre},</p>
        <p>Le informamos que hemos recibido una solicitud para validar su dirección de correo electrónico:</p>
        <p>Correo: ${email}</p>
        <p>Por favor, haga clic en el siguiente botón para validar su correo electrónico:</p>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #004080; color: #fff; text-decoration: none; border-radius: 5px;">Validar correo electrónico</a>
        <p>Gracias por confiar en nosotros.</p>
      
   
        `;
        const options = {
            to: email,
            subject: 'Validación de correo electrónico',
            htmlBody: htmlBody
        }

        const isSent = await this.emailService.sendEmail( options );
        if ( !isSent ) throw CustomError.internalServer('Error al enviar email');
        return true;
    }

    public validateEmail = async ( token:string) => {
     
        const payload = await JwtGenerator.validateToken(token);
        if ( !payload ) throw CustomError.unauthorized('Error validando token');
       
        const { email } = payload as { email: string };
        if ( !email ) throw CustomError.internalServer('email not in token');
        
        const user = await UserModel.findOne({email});
        if ( !user ) throw CustomError.internalServer('Email not exist')
        user.emailValidated = true;
        await user.save();
        return {
          message: 'Email validated',
          emailValidated: true,
        
      }
    }
  
  
    
}