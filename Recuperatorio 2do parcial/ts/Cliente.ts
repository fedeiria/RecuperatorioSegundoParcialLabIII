namespace General {
    export class Cliente extends Persona {    
        private edad: number;
        private sexo: ESexo;
    
        constructor(id: number, nombre: string, apellido: string, edad: number, sexo: string) {
            super(id, nombre, apellido);
            this.edad = this.setEdad(edad);
            this.setSexo(sexo);
        }

        /**
         * Setea la edad del cliente.
         * @param edad
         */
        public setEdad(edad: number): number {
            return this.edad = edad;
        }

        /**
         * Setea el sexo del cliente
         */
        public setSexo(sexo: string): void {
            switch(sexo) {
                case 'Masculino': {
                    this.sexo = ESexo.Masculino;
                    break;
                }
                case 'femenino': {
                    this.sexo = ESexo.Femenino;
                    break;
                }
            }
        }

        /**
         * Retorna la edad del cliente.
         */
        public getEdad(): number {
            return this.edad;
        }

        /**
         * Retorna el sexo del cliente
         */
        public getSexo(): string {
            if (this.sexo == 0) {
                return "Masculino";
            }
            else {
                return "Femenino";
            }
        }
    }
}