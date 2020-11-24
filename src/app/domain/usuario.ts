export class Usuario {
    constructor(
        public emailUsuario: string,
        public estado: string,
        public nombreUsuario: string,
        public idTipoUsuario: number,
        public contrasena: string,
        public fotoUrl: string
      ){}
}
