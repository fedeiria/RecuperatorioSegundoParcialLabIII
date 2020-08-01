namespace General {

    /**
     * Valida que el dato ingresado sea de tipo string y tenga una longitud de 2 caracteres minimo
     * @param {*} string 
     */
    export function validString(string: string): boolean {
        let value: boolean = true;
        let pattern: RegExp = RegExp("^[A-Za-z \u00E0-\u00FC]+$");

        let tmpString: string = string.trim();

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

    /**
     * Valida que el dato ingresado sea de tipo alfanumerico y tenga una longitud de 2 caracteres minimo
     * @param {*} string 
     */
    export function validAlphanumeric(string: string): boolean {
        let value: boolean = true;
        let pattern: RegExp = RegExp("^[A-Za-z0-9 \u00E0-\u00FC]+$");

        let tmpString: string = string.trim();

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

    /**
     * Valida que el dato ingresado sea numerico y no este vacio
     * @param {*} age
     */
    export function validNumber(price: string): boolean {
        let value: boolean = true;

        if (price.length == 0) {
            alert("El campo no puede estar vacio.");
            value = false;
        }
        
        return value;
    }

    /**
     * Solo permite escribir numeros
     */
    export function onlyNumbers() {
        let keyPressedAge = <HTMLInputElement>document.getElementById('edad');

        keyPressedAge.addEventListener('keypress', function(event) {
            if (event.which < 48 || event.which > 57) {
                event.preventDefault();
            }
        });
    }

    /**
     * Evento clic del boton 'calcula-promedio' llama a la funcion 'averagePrice'
     */
    export function buttonAveragePrice() {
        let keyPressAveragePrice = <HTMLInputElement>document.getElementById('calcula-promedio');
        
        keyPressAveragePrice.addEventListener('click', function(event) {
            General.averagePrice();
        });
    }

    /**
     * Evento 'change' del boton 'filtrar por' llama a las funciones filterByMale(), filterByFemale() y filterAll()
     */
    export function filterBySex() {
        let keyPressFilter = <HTMLInputElement>document.getElementById('filtro-personas');

        keyPressFilter.addEventListener('change', function(event) {
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
}