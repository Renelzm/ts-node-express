export class CreateUserDto {

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
      public role: string[],
      public active: boolean,
      public emailValidated?: boolean,
      public ineFoto?: string,
    ) {}
  
    static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
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
        ineFoto,
        password,
        role,
        active,
        emailValidated,
      } = object;
  
      if (!nombre) return ['Missing name'];
      if (!primerApellido) return ['Missing primerApellido'];
      if (!segundoApellido) return ['Missing segundoApellido'];
      if (!email) return ['Missing email'];
    //   if (!regularExps.email.test(email)) return ['Email is not valid'];
      if (!telefono) return ['Missing telefono'];
   
  
      return [undefined, new CreateUserDto(
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
        role,
        active,
        emailValidated,
      )];
    };
} 


   
