import { CustomError } from "../errors/custom.error";

export class UserEntity {

    constructor(
public id: string,
public nombre: string,
public primerApellido: string,
public segundoApellido: string,
public email: string,
public telefono: string,
public area: string,
public claveElectoral: string,
public curp: string,
public direccion: {
    vialidad: string,
    numeroExterior: string,
    colonia: string,
    municipio: string,
    seccionElectoral: string,
},
public ineFoto: string,
public password: string,
public passwordChangedAt: Date|null,
public role: string[],
public active: boolean,
public campaing: string,
public emailValidated?: boolean,
public passwordChanged?: boolean,
public firstCheck?: boolean,
    ){
    }
static fromObject (object: {[key:string]:any}) {
    const { 
        id,
        _id,
        nombre,
        primerApellido,
        segundoApellido,
        email,
        telefono,
        area,
        claveElectoral,
        curp,
        direccion,
        ineFoto,
        password,
        passwordChangedAt,
        role,
        active,
        campaing,
        emailValidated,
        passwordChanged,
        firstCheck
    }  = object;

    if (!id && _id){
        throw CustomError.badRequest("Missing id")
    }

    return new UserEntity(   id ||_id,
        nombre,
        primerApellido,
        segundoApellido,
        email,
        telefono,
        area,
        claveElectoral,
        curp,
        direccion,
        ineFoto,
        password,
        passwordChangedAt,
        role,
        active,
        campaing,
        emailValidated,
        passwordChanged,
        firstCheck
    )
}
}