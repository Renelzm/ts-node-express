import mongoose from "mongoose";
// import validator from 'validator';

const userSchema = new mongoose.Schema({
    campaign: {
        type: String,
        required: [true, 'El usuario debe tener una campaña'],
    },
    nombre: {
        type: String,
        required: [true, 'El usuario debe tener un nombre'],
    },

    primerApellido: {
        type: String,
        required: [true, 'El usuario debe tener un primer apellido'],
    },

    segundoApellido: {
        type: String,
        required: [true, 'El usuario debe tener un segundo apellido'],
    },

    email: {
        type: String,
        required: [true, 'El usuario debe tener un email'],
        unique: true,
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid email'],
    },
    emailValidated: {
      type: Boolean,
      default: false,
    },

    telefono: {
        type: String,
        // unique: true,
        required: [true, 'El usuario debe tener un télefono de contacto'],
    },

    area: {
        type: String,
        required: [true, 'El usuario debe tener un area o distrito '],
        // enum: [
        //   'saltillo',
        //   'torreón',
        //   'monclova',
        //   'rio grande',
        //   'sabinas',
        //   'acuña',
        //   'parras',
        //   'san pedro',
        // ],
    },

    claveElectoral: {
        type: String,
        // unique: true,
        // validate: {
        //     validator: function (val: any) {
        //         return /[A-Z]{6}[0-9]{8}[A-Z][0-9]{3}/.test(val);
        //     },
        //     message: 'Formato de clave electoral inválido',
        // },
        required: [true, 'El usuario debe tener una clave electoral'],
    },

    curp: {
        type: String,
        // unique: true,
        // validate: {
        //   validator: function (val) {
        //     return /^([A-Z&]|[a-z&]{1})([AEIOUX]|[aeioux]{1})([A-Z&]|[a-z&]{1})([A-Z&]|[a-z&]{1})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([HM]|[hm]{1})([AS|as|BC|bc|BS|bs|CC|cc|CS|cs|CH|ch|CL|cl|CM|cm|DF|df|DG|dg|GT|gt|GR|gr|HG|hg|JC|jc|MC|mc|MN|mn|MS|ms|NT|nt|NL|nl|OC|oc|PL|pl|QT|qt|QR|qr|SP|sp|SL|sl|SR|sr|TC|tc|TS|ts|TL|tl|VZ|vz|YN|yn|ZS|zs|NE|ne]{2})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([0-9]{2})$/.test(
        //       val
        //     );
        //     // https://www.regextester.com/112877
        //   },
        //   message: 'Formato de curp inválido',
        // },
        required: [true, 'El ususario debe tener una CURP'],
    },

    direccion: {
        vialidad: {
            type: String,
            required: [true, 'El usuario debe tener una vialidad'],
        },
        numeroExterior: {
            type: String,
            required: [true, 'El usuario debe tener un número exterior'],
        },
        colonia: {
            type: String,
            required: [true, 'El usuario debe tener una colonia'],
        },
        municipio: {
            type: String,
            required: [true, 'El usuario debe tener un municipio'],
        },
        seccionElectoral: {
            type: String,
            required: [true, 'El usuario debe tener una sección electoral'],
        },
    },

    ineFoto: {
        type: String,
    },

    password: {
        type: String,
        required: [true, 'El usuario debe tener un password'],
        minlenght: 8,
        select: false, // no saldrá en ningún output
    },

    // passwordConfirm: {
    //     type: String,
    //     required: [true, 'Se debe confirmar el password'],
    //     minlenght: 8,
    //     // validate: {
    //     //   // This only works on CREATE or SAVE (not in findOneAndUpdate) !!
    //     //   validator: function (val: any ) {
    //     //     return val === this.password; // La función debe regresar true o false
    //     //   },
    //     //   message: 'Los passwords no coinciden',
    //     // },
    // },
    passwordChangedAt: {
        type: Date,
        default: new Date(),
    },
    role: {
        type: String,
        // default: [''],
        enum: ['ADMIN_ROLE', 'GENERAL_ROLE', 'JEFE_AREA_ROLE', 'COORDINADOR_ROLE', 'PROMOTOR_ROLE'],
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    passwordChanged: {
        type: Boolean,
        default: false,
    },
    firstCheck: {
        type: Boolean,
        default: false,
    },
    passwordResetToken: String,

    passwordResetExpires: Date,

},
    // { discriminatorKey: 'role' }
);

export const UserModel = mongoose.model('User', userSchema)