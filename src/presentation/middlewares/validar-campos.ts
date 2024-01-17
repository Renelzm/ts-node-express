
import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";
import { CustomError } from '../../domain';
import { CreateUserDto } from '../../domain/dtos/auth/user-create.dto';

const customError =  CustomError.badRequest('')
export class ValidarCampos {
// Con express validator
    public ValidateExpressValidator(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages: string[] = [];

            errors.array().forEach(error => {
                errorMessages.push(error.msg);
            });

            return res.status(400).json({ error: customError});
        }

        next();
    }
    public ValidateCreateUserDTO(req: Request, res: Response, next: NextFunction) {
        const userDtoResult = CreateUserDto.create(req.body);

        if (userDtoResult[0]) {
            // Hubo errores en la creación del DTO, puedes manejarlos aquí
            // throw CustomError.badRequest('Fallo algo')
            return res.status(400).json({ error: userDtoResult[0] });
          }

        next();
    }
}