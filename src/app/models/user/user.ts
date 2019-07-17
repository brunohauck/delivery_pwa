export class User{

    constructor(
        public id: string,
        public id_sqlite: string,
        public nome: string,
        public email: string,
        public password: string,
        public status: string ){}
}