import { regularExps } from '../../../config/regularExpressions';
export class RegisterUserDto {

    constructor(
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
      public password: string,
      public role: string,
      public active: boolean,
      public campaign: string,
      public passwordChanged?: boolean,
      public passwordChangedAt?: Date|null,
      public emailValidated?: boolean,
      public ineFoto?: string,
    ) {}


    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
      
      const {
        nombre,
        primerApellido,
        segundoApellido,
        email,
        telefono,
        area,
        claveElectoral,
        curp,
        direccion,
        password,
        role,
        active,
        campaign,
        passwordChanged,
        passwordChangedAt,
        emailValidated,
        ineFoto,
      } = object;
   
      if (!nombre) return ['Missing name'];
      if (!primerApellido) return ['Missing primerApellido'];
      if (!segundoApellido) return ['Missing segundoApellido'];
      if (!email) return ['Missing email'];
      if (!regularExps.email.test(email)) return ['Email is not valid'];
      if (!telefono) return ['Missing telefono'];
      if (!area) return ['Missing area'];
      if (!claveElectoral) return ['Missing claveElectoral'];
      // if (!regularExps.claveElectoral.test(claveElectoral)) return ['Clave Electoral is not valid'];
      if (!curp) return ['Missing curp'];
      // if (!regularExps.curp.test(curp)) return ['CURP is not valid'];
      // if (!role || !Array.isArray(role) || role.length === 0 || !role.every(r => ['ADMIN_ROLE', 'GENERAL_ROLE', 'JEFE_AREA_ROLE', 'COORDINADOR_ROLE', 'PROMOTOR_ROLE'].includes(r))) {
      //   return ['Invalid role'];
      // }
      if (!direccion || !direccion.vialidad || !direccion.numeroExterior || !direccion.colonia || !direccion.municipio || !direccion.seccionElectoral) {
        return ['Invalid direccion'];
      }
      // if (!ineFoto) return ['Missing ineFoto'];
      if (!password || password.length < 6) return ['Error en password'];

  
      return [undefined, new RegisterUserDto(
        nombre,
        primerApellido,
        segundoApellido,
        email,
        telefono,
        area,
        claveElectoral,
        curp,
        direccion,
        password,
        role,
        active,
        campaign,
        passwordChanged,
        passwordChangedAt,
        emailValidated,
        ineFoto,
      )];
    };
} 


   
