namespace General {
    export class Persona {
        private id: number;
        private nombre: string;
        private apellido: string;
    
        constructor(id: number, nombre: string, apellido: string) {
            this.id = this.setId(id);
            this.nombre = this.setNombre(nombre);
            this.apellido = this.setApellido(apellido);
        }
    
        /**
         * Setea el id ingresado.
         * @param id parametro a setear
         */
        public setId(id: number): number {
            return this.id = id;
        }

        /**
         * Setea el nombre ingresado.
         * @param nombre parametro a setear
         */
        public setNombre(nombre: string): string {
            return this.nombre = nombre;
        }

        /**
         * Setea el apellido ingresado.
         * @param apellido parametro a setear
         */
        public setApellido(apellido: string): string {
            return this.apellido = apellido;
        }
    
        /**
         * Retorna el id.
         */
        public getId(): number {
            return this.id;
        }

        /**
         * Retorna el nombre.
         */
        public getNombre(): string {
            return this.nombre;
        }

        /**
         * Retorna el apellido.
         */
        public getApellido(): string {
            return this.apellido;
        }
    }
}