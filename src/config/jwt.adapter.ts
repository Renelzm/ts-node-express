import jwt from 'jsonwebtoken';
import { envs } from './envs';



export class JwtGenerator {

    constructor(){}

    static async generateToken( payload: any, duration: string = '24h') {
    return new Promise((resolve, reject)  => {
        const token = jwt.sign(payload, envs.JWTSEED , {expiresIn: duration }, (err, token) => {
            if (err) { return resolve(null)}
            return resolve (token)
        }); 
        
    })
       
  
    }

    static async validateToken ( token: string) {
       
       return new Promise((resolve, reject) => {
        const  verification = jwt.verify(token, envs.JWTSEED, (error, decoded) => {
            if (error) { return resolve(null); }
            return resolve (decoded);
        
        })
        

       })
      
    }
}