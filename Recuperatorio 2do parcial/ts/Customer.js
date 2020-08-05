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
    var Customer = /** @class */ (function (_super) {
        __extends(Customer, _super);
        function Customer(id, name, surname, age, sex) {
            var _this = _super.call(this, id, name, surname) || this;
            _this.age = _this.setAge(age);
            _this.sex = _this.setSex(sex);
            return _this;
        }
        /**
         * Setea la edad del cliente.
         * @param age
         */
        Customer.prototype.setAge = function (age) {
            return this.age = age;
        };
        /**
         * Setea el sexo del cliente
         */
        Customer.prototype.setSex = function (sex) {
            return this.sex = sex;
        };
        /**
         * Retorna la edad del cliente.
         */
        Customer.prototype.getAge = function () {
            return this.age;
        };
        /**
         * Retorna el sexo del cliente
         */
        Customer.prototype.getSex = function () {
            return this.sex;
        };
        return Customer;
    }(General.Person));
    General.Customer = Customer;
})(General || (General = {}));
