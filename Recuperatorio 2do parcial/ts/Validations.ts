namespace General {

    /**
     * Valida que el dato ingresado sea de tipo string y tenga una longitud de 2 caracteres minimo
     * @param {*} string 
     */
    export function validString(string: string): boolean {
        let value: boolean = true;
        let tmpString: string = string.trim();
        let pattern: RegExp = RegExp("^[A-Za-z \u00E0-\u00FC]+$");

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
        let tmpString: string = string.trim();
        let pattern: RegExp = RegExp("^[A-Za-z0-9 \u00E0-\u00FC]+$");

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

    export function validNumber(string: string) {
        let tmpString: string = string.trim();

        onlyNumbers();

        if (tmpString.length == 0) {
            alert("El campo no puede estar vacio.");
            return false;
        }
        
        return true;
    }

    /**
     * Solo permite escribir numeros
     */
    export function onlyNumbers() {
        let keyPressedAge = <HTMLInputElement>document.getElementById('age');

        keyPressedAge.addEventListener('keypress', function(event) {
            if (event.which < 48 || event.which > 57 || event.which == 62) {
                event.preventDefault();
            }
        });
    }
}