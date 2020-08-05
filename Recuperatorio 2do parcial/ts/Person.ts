namespace General {
    export class Person {
        private id: number;
        private name: string;
        private surname: string;
    
        constructor(id: number, name: string, surname: string) {
            this.id = this.setId(id);
            this.name = this.setName(name);
            this.surname = this.setSurname(surname);
        }
    
        /**
         * Setea el id ingresado.
         * @param id
         */
        public setId(id: number): number {
            return this.id = id;
        }

        /**
         * Setea el nombre ingresado.
         * @param name
         */
        public setName(name: string): string {
            return this.name = name;
        }

        /**
         * Setea el apellido ingresado.
         * @param surname
         */
        public setSurname(surname: string): string {
            return this.surname = surname;
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
        public getName(): string {
            return this.name;
        }

        /**
         * Retorna el apellido.
         */
        public getSurname(): string {
            return this.surname;
        }
    }
}