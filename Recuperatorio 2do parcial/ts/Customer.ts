namespace General {
    export class Customer extends Person {    
        private age: number;
        private sex: ESex;
    
        constructor(id: number, name: string, surname: string, age: number, sex: ESex) {
            super(id, name, surname);
            this.age = this.setAge(age);
            this.sex = this.setSex(sex);
        }

        /**
         * Setea la edad del cliente.
         * @param age
         */
        public setAge(age: number): number {
            return this.age = age;
        }

        /**
         * Setea el sexo del cliente
         */
        public setSex(sex: ESex): ESex {
            return this.sex = sex;
        }

        /**
         * Retorna la edad del cliente.
         */
        public getAge(): number {
            return this.age;
        }

        /**
         * Retorna el sexo del cliente
         */
        public getSex(): ESex {
            return this.sex;
        }
    }
}