var General;
(function (General) {
    var Person = /** @class */ (function () {
        function Person(id, name, surname) {
            this.id = this.setId(id);
            this.name = this.setName(name);
            this.surname = this.setSurname(surname);
        }
        /**
         * Setea el id ingresado.
         * @param id
         */
        Person.prototype.setId = function (id) {
            return this.id = id;
        };
        /**
         * Setea el nombre ingresado.
         * @param name
         */
        Person.prototype.setName = function (name) {
            return this.name = name;
        };
        /**
         * Setea el apellido ingresado.
         * @param surname
         */
        Person.prototype.setSurname = function (surname) {
            return this.surname = surname;
        };
        /**
         * Retorna el id.
         */
        Person.prototype.getId = function () {
            return this.id;
        };
        /**
         * Retorna el nombre.
         */
        Person.prototype.getName = function () {
            return this.name;
        };
        /**
         * Retorna el apellido.
         */
        Person.prototype.getSurname = function () {
            return this.surname;
        };
        return Person;
    }());
    General.Person = Person;
})(General || (General = {}));
