var General;
(function (General) {
    /**
     * Valida que el dato ingresado sea de tipo string y tenga una longitud de 2 caracteres minimo
     * @param {*} string
     */
    function validString(string) {
        var value = true;
        var pattern = RegExp("^[A-Za-z \u00E0-\u00FC]+$");
        var tmpString = string.trim();
        if (tmpString.length == 0) {
            alert("El campo no puede estar vacio.");
            value = false;
        }
        else if (!pattern.test(string)) {
            alert("Solo se permiten letras.");
            value = false;
        }
        else if (string.length < 2) {
            alert("El campo debe contener 2 caracteres como minimo.");
            value = false;
        }
        return value;
    }
    General.validString = validString;
    /**
     * Valida que el dato ingresado sea de tipo alfanumerico y tenga una longitud de 2 caracteres minimo
     * @param {*} string
     */
    function validAlphanumeric(string) {
        var value = true;
        var pattern = RegExp("^[A-Za-z0-9 \u00E0-\u00FC]+$");
        var tmpString = string.trim();
        if (tmpString.length == 0) {
            alert("El campo no puede estar vacio.");
            value = false;
        }
        else if (!pattern.test(string)) {
            alert("Solo se permiten letras y numeros (Sin simbolos).");
            value = false;
        }
        else if (string.length < 2) {
            alert("El campo debe contener 2 caracteres como minimo.");
            value = false;
        }
        return value;
    }
    General.validAlphanumeric = validAlphanumeric;
    /**
     * Valida que el dato ingresado sea numerico y no este vacio
     * @param {*} age
     */
    function validNumber(price) {
        var value = true;
        if (price.length == 0) {
            alert("El campo no puede estar vacio.");
            value = false;
        }
        return value;
    }
    General.validNumber = validNumber;
    /**
     * Solo permite escribir numeros
     */
    function onlyNumbers() {
        var keyPressedAge = document.getElementById('edad');
        keyPressedAge.addEventListener('keypress', function (event) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        });
    }
    General.onlyNumbers = onlyNumbers;
    /**
     * Evento clic del boton 'calcula-promedio' llama a la funcion 'averagePrice'
     */
    function buttonAveragePrice() {
        var keyPressAveragePrice = document.getElementById('calcula-promedio');
        keyPressAveragePrice.addEventListener('click', function (event) {
            General.averagePrice();
        });
    }
    General.buttonAveragePrice = buttonAveragePrice;
    /**
     * Evento 'change' del boton 'filtrar por' llama a las funciones filterByMale(), filterByFemale() y filterAll()
     */
    function filterBySex() {
        var keyPressFilter = document.getElementById('filtro-personas');
        keyPressFilter.addEventListener('change', function (event) {
            if (keyPressFilter.value == "1") {
                General.filterByMale();
            }
            else if (keyPressFilter.value == "2") {
                General.filterByFemale();
            }
            else if (keyPressFilter.value == "3") {
                General.filterAll();
            }
        });
    }
    General.filterBySex = filterBySex;
})(General || (General = {}));
