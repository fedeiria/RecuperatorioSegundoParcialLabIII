var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var General;
(function (General) {
    var Cliente = /** @class */ (function (_super) {
        __extends(Cliente, _super);
        function Cliente(id, nombre, apellido, edad, sexo) {
            var _this = _super.call(this, id, nombre, apellido) || this;
            _this.edad = _this.setEdad(edad);
            _this.setSexo(sexo);
            return _this;
        }
        /**
         * Setea la edad del cliente.
         * @param edad
         */
        Cliente.prototype.setEdad = function (edad) {
            return this.edad = edad;
        };
        /**
         * Setea el sexo del cliente
         */
        Cliente.prototype.setSexo = function (sexo) {
            return this.sexo = sexo;
        };
        /**
         * Retorna la edad del cliente.
         */
        Cliente.prototype.getEdad = function () {
            return this.edad;
        };
        /**
         * Retorna el sexo del cliente
         */
        Cliente.prototype.getSexo = function () {
            return this.sexo;
        };
        return Cliente;
    }(General.Persona));
    General.Cliente = Cliente;
})(General || (General = {}));
