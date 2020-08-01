var General;
(function (General) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = this.setId(id);
            this.nombre = this.setNombre(nombre);
            this.apellido = this.setApellido(apellido);
        }
        /**
         * Setea el id ingresado.
         * @param id parametro a setear
         */
        Persona.prototype.setId = function (id) {
            return this.id = id;
        };
        /**
         * Setea el nombre ingresado.
         * @param nombre parametro a setear
         */
        Persona.prototype.setNombre = function (nombre) {
            return this.nombre = nombre;
        };
        /**
         * Setea el apellido ingresado.
         * @param apellido parametro a setear
         */
        Persona.prototype.setApellido = function (apellido) {
            return this.apellido = apellido;
        };
        /**
         * Retorna el id.
         */
        Persona.prototype.getId = function () {
            return this.id;
        };
        /**
         * Retorna el nombre.
         */
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        /**
         * Retorna el apellido.
         */
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        return Persona;
    }());
    General.Persona = Persona;
})(General || (General = {}));
