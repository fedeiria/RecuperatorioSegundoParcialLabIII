var General;
(function (General) {
    /**
     * Valida que el dato ingresado sea de tipo string y tenga una longitud de 2 caracteres minimo
     * @param {*} string
     */
    function validString(string) {
        var value = true;
        var tmpString = string.trim();
        var pattern = RegExp("^[A-Za-z \u00E0-\u00FC]+$");
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
        var tmpString = string.trim();
        var pattern = RegExp("^[A-Za-z0-9 \u00E0-\u00FC]+$");
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
    General.validAlphanumeric = validAlphanumeric;
    function validNumber(string) {
        var tmpString = string.trim();
        onlyNumbers();
        if (tmpString.length == 0) {
            alert("El campo no puede estar vacio.");
            return false;
        }
        return true;
    }
    General.validNumber = validNumber;
    /**
     * Solo permite escribir numeros
     */
    function onlyNumbers() {
        var keyPressedAge = document.getElementById('age');
        keyPressedAge.addEventListener('keypress', function (event) {
            if (event.which < 48 || event.which > 57 || event.which == 62) {
                event.preventDefault();
            }
        });
    }
    General.onlyNumbers = onlyNumbers;
    /**
     * Evento clic del boton 'calcula-promedio' llama a la funcion 'averagePrice'
     */
    function buttonAveragePrice() {
        var keyPressAveragePrice = document.getElementById('calculate-average');
        keyPressAveragePrice.addEventListener('click', function (event) {
            General.averagePrice();
        });
    }
    General.buttonAveragePrice = buttonAveragePrice;
    /**
     * Evento 'change' del boton 'filtrar por' llama a las funciones filterByMale(), filterByFemale() y filterAll()
     */
    function filterBySex() {
        var keyPressFilter = document.getElementById('filter-customers');
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
