namespace General {

    // variable para almacenar el dato de la fila seleccionada
    var trClick: HTMLInputElement;

    // Lista de personas
    var listaClientes: Array<General.Cliente> = new Array<General.Cliente>();

    // variables para manejar los datos del formulario con el DOM
    var inputId: HTMLInputElement = <HTMLInputElement>document.getElementById('id');
    var inputNombre: HTMLInputElement = <HTMLInputElement>document.getElementById('nombre');
    var inputApellido: HTMLInputElement = <HTMLInputElement>document.getElementById('apellido');
    var inputEdad: HTMLInputElement = <HTMLInputElement>document.getElementById('edad');
    var inputSexo: HTMLInputElement = <HTMLInputElement>document.getElementById('sexo');

    // Eventos llamados cada vez que se carga la pagina
    window.addEventListener('load', hideForm);
    window.addEventListener('load', General.onlyNumbers);
    window.addEventListener('load', General.buttonAveragePrice);
    window.addEventListener('load', General.filterBySex);
    window.addEventListener('load', filterByCheckOption);
    window.addEventListener('load', clearTable);

    /**
     * Crea una fila con la informacion pasada por parametro
     * @param {*} jsonObject 
     */
    export function newRow(jsonObject) {
        let newRow = document.createElement('tr');

        // Agrego el id
        let newCellId = document.createElement('td');
        newCellId.setAttribute("name", "tdId");
        let textNodeId = document.createTextNode(jsonObject.id);
        newCellId.appendChild(textNodeId);
        newRow.appendChild(newCellId);

        // Agrego el nombre
        let newCellNombre = document.createElement('td');
        newCellNombre.setAttribute("name", "tdNombre");
        let textNodeNombre = document.createTextNode(jsonObject.nombre);
        newCellNombre.appendChild(textNodeNombre);
        newRow.appendChild(newCellNombre);
    
        // Agrego el apellido
        let newCellApellido = document.createElement('td');
        newCellApellido.setAttribute("name", "tdApellido");
        let textNodeApellido = document.createTextNode(jsonObject.apellido);
        newCellApellido.appendChild(textNodeApellido);
        newRow.appendChild(newCellApellido);

        // Agrego la edad
        let newCellEdad = document.createElement('td');
        newCellEdad.setAttribute("name", "tdEdad");
        let textNodeEdad = document.createTextNode(jsonObject.edad);
        newCellEdad.appendChild(textNodeEdad);
        newRow.appendChild(newCellEdad);

        // Agrego el sexo
        let newCellSexo = document.createElement('td');
        newCellSexo.setAttribute("name", "tdSexo");
        let textNodeSexo = document.createTextNode(jsonObject.sexo);
        newCellSexo.appendChild(textNodeSexo);
        newRow.appendChild(newCellSexo);
    
        // Evento click, llama a la funcion 'clickRow'
        newRow.addEventListener('click', clickRow);
    
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }

    /**
    * Recorre los datos del objeto JSON para ir formando la tabla
    * @param {*} jsonObject 
    */
    export function loadJsonObjectToHtml(jsonObject) {
        for (var i = 0; i < jsonObject.length; i++) {
            newRow(jsonObject[i]);
        }
    }

    /**
     * Comprueba que se completen todos los campos del formulario y llama a las funciones para agregar un nuevo cliente en la lista y en la tabla de index.html
     */
    export function newPerson() {
        let nombre = <HTMLInputElement>document.getElementById('nombre');
        let apellido = <HTMLInputElement>document.getElementById('apellido');
        let edad = <HTMLInputElement>document.getElementById('edad');
        let sexo = <HTMLInputElement>document.getElementById('sexo');

        if (newCustomer(findNextId())) {
            if (confirm("¿Esta seguro que desea agregar un nuevo cliente?")) {
                let sex = sexo.value;

                if (sex == "1") {
                    sex = "Masculino";
                }
                else {
                    sex = "Femenino";
                }

                let data = { id:findNextId(), nombre:nombre.value, apellido:apellido.value, edad:edad.value, sexo:sex };
                saveNewCustomer(data);
                changeLabelNewPersonForm();
            }
        }
    }

    /**
     * Agrega una nuevo auto en la lista de vehiculos
     * @param id 
     */
    export function newCustomer(id: number): boolean {
        let value: boolean = false;
        let nombre = <HTMLInputElement>document.getElementById('nombre');
        let apellido = <HTMLInputElement>document.getElementById('apellido');
        let edad = <HTMLInputElement>document.getElementById('edad');
        let sexo = <HTMLInputElement>document.getElementById('sexo');

        if (General.validString(nombre.value)) {
            if (General.validString(apellido.value)) {
                if (General.validNumber(edad.value)) {
                    let customer: General.Cliente = new General.Cliente(id, nombre.value, apellido.value, Number.parseInt(edad.value), sexo.value);
                    listaClientes.push(customer);
                    value = true;
                }
                else {
                    document.getElementById("edad").className = "error";
                }
            }
            else {
                document.getElementById("apellido").className = "error";
            }
        }
        else {
            document.getElementById("nombre").className = "error";
        }

        return value;
    }

    /**
     * Bloquea la pagina con un spinner y agrega un nuevo vehiculo en la tabla
     * @param {*} jsonObject 
     */
    export function saveNewCustomer(jsonObject): void {
        loadPromise().then(() => {
            newRow(jsonObject);
        }).catch(() => {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Elimina un vehiculo de la tabla
     * @param id 
     */
    export function removeCustomer(id: number) {
        listaClientes.filter(function(item) {
            if (item.getId() == id) {
                listaClientes.splice(id - 1, 1);
            }
        });
    }
    
    /**
     * Muestra un spinner durante 3 segundos mientras se graba la informacion en la lista
     */
    export function loadPromise() {
        return new Promise((resolve, reject) => {
            showSpinner();
            setTimeout(() => {
                hideSpinner();
                resolve();
                reject();
            }, 2000);
        });
    }

    /**
     * Obtiene el siguiente ID de la lista
     */
    export function findNextId(): number {
        let nextId = listaClientes.reduce(function(prev, next) {
            if (next.getId() == 0) {
                prev = next.setId(prev + 1);
            }
            else {
                prev = next.setId(prev + 1);
            }

            return prev;
        }, 0);

        return nextId;
    }

    /**
     * Elimina la fila seleccionada en el formulario
     * @param {*} event 
     */
    export function clickRow(event) {
        showInfoRow(event); 
    }

    export function deletePerson(event) {
        if (confirm("Desea eliminar el cliente?")) {
            loadPromise().then(() => {
                let index = Number.parseInt(inputId.value);
                console.log(index);
                removeCustomer(index);
                trClick.remove();
            }).catch(() => {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
            changeLabelNewPersonForm();
        }
    }

    /**
     * Abre el formulario al realizar 'clic' sobre la fila y carga los datos de la misma en los campos del formulario
     * @param {*} event 
     */
    export function showInfoRow(event) {
        document.getElementById('container').hidden = false;
        document.getElementById('addFormDataButton').hidden = true;
        document.getElementById('deleteFormDataButton').hidden = false;

        trClick = event.target.parentNode;

        inputId.value = trClick.childNodes[0].textContent;
        inputNombre.value = trClick.childNodes[1].textContent;
        inputApellido.value = trClick.childNodes[2].textContent;
        inputEdad.value = trClick.childNodes[3].textContent;
        inputSexo.value = trClick.childNodes[4].textContent;
    }

    /**
     * Elimina los datos de la tabla
     */
    export function clearTable() {
        document.getElementById('limpiar-tabla').addEventListener('click', function() {
            let bodyTable = document.querySelector('tbody');
            bodyTable.innerHTML = "";

            listaClientes.filter(item => {
                if (item.getId() > 0) {
                    listaClientes.splice(item.getId() -1, 1);
                }
            });
        });
    }
    
    /**
     * Elimina los datos de la tabla en index.html
     */
    export function deleteTable() {
        let bodyTable = document.querySelector('tbody');
        bodyTable.innerHTML = "";
    }

    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo masculino. Carga la tabla con los datos filtrados.
     */
    export function filterByMale() {
        let male = listaClientes.filter(function(item) {
            return item.getSexo() == "Masculino";
        });

        deleteTable();

        loadPromise().then(() => {    
            male.forEach(item => {
                newRow(item);
            });
        }).catch(() => {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo femenino. Carga la tabla con los datos filtrados.
     */
    export function filterByFemale() {
        let female = listaClientes.filter(function(item) {
            return item.getSexo() == "Femenino";
        });

        deleteTable();

        loadPromise().then(() => {
            female.forEach(function(item) {
                newRow(item);
            });
        }).catch(() => {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Recorre la lista de clientes y devuelve un array con toda la informacion contenida. Carga la tabla con los datos filtrados.
     */
    export function filterAll() {
        deleteTable();
        
        loadPromise().then(() => {
            listaClientes.forEach(function(item) {
                newRow(item);
            });
        }).catch(() => {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Oculta la/s columna/s con los datos en funcion de las opciones tildadas / destildadas del checkbox
     */
    export function filterByCheckOption() {
        let optionId = <HTMLInputElement>document.getElementById('id-filter');
        let optionNombre = <HTMLInputElement>document.getElementById('nombre-filter');
        let optionApellido = <HTMLInputElement>document.getElementById('apellido-filter');
        let optionEdad = <HTMLInputElement>document.getElementById('edad-filter');

        optionId.addEventListener('click', function() {
            let radioId = document.getElementsByName('tdId');

            if (optionId.checked) {
                document.getElementById('thId').hidden = false;
                radioId.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thId').hidden = true;
                radioId.forEach(item => {
                    item.hidden = true;
                });
            }
        });

        optionNombre.addEventListener('click', function() {
            let radioMarca = document.getElementsByName('tdNombre');

            if (optionNombre.checked) {
                document.getElementById('thNombre').hidden = false;
                radioMarca.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thNombre').hidden = true;
                radioMarca.forEach(item => {
                    item.hidden = true;
                });
            }
        });
        

        optionApellido.addEventListener('click', function() {
            let radioModelo = document.getElementsByName('tdApellido');

            if (optionApellido.checked) {
                document.getElementById('thApellido').hidden = false;
                radioModelo.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thApellido').hidden = true;
                radioModelo.forEach(item => {
                    item.hidden = true;
                });
            }
        });
        

        optionEdad.addEventListener('click', function() {
            let radioPrecio = document.getElementsByName('tdEdad');

            if (optionEdad.checked) {
                document.getElementById('thEdad').hidden = false;
                radioPrecio.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thEdad').hidden = true;
                radioPrecio.forEach(item => {
                    item.hidden = true;
                });
            }
        });
    }

    /**
     * Calcula el promedio de edad de los clientes de la tabla
     */
    export function averagePrice() {
        let average = listaClientes.reduce(function(prev, next) {
            prev += next.getEdad();
            return prev;
        }, 0);

        average /= listaClientes.length;

        let inputPromedio = <HTMLInputElement>document.getElementById('edad-promedio');
        inputPromedio.value = average.toString();
    }

    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Nueva persona" / "Cerrar formulario"
     * @param {*} event 
     */
    export function newPersonForm(event): void {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        document.getElementById('deleteFormDataButton').hidden = true;
        changeLabelNewPersonForm();
        console.log(listaClientes);
    }
    
    /**
     * Muestra el formulario
     */
    export function showForm(): void {
        document.getElementById('container').hidden = false;
    }

    /**
     * Oculta el formulario
     */
    export function hideForm(): void {
        document.getElementById('container').hidden = true;
    }

    /**
     * Deshabilita el comportamiento por defecto del boton para cerrar el formulario
     * @param event
     */
    export function disableEventDefaultCloseButton(event) {
        event.preventDefault();
        changeLabelNewPersonForm();
    }

    /**
     * Cambia el texto del boton 'Alta / Cerrar formulario' cada vez que se selecciona
     */
    export function changeLabelNewPersonForm(): void {
        let visibleForm = document.getElementById('container').hidden;
        let addFormLabel = <HTMLInputElement>document.getElementById('openForm');
        inputId = <HTMLInputElement>document.getElementById('id');

        if (visibleForm == true) {
            showForm();
            let nextId = findNextId() + 1;
            inputId.value = nextId.toString();
            addFormLabel.value = "Cerrar formulario";
        }
        else {
            hideForm();
            clearTextBoxForm();
            clearBorderTextBoxForm();
            addFormLabel.value = "Nueva persona";
        }
    }

    /**
     * Muestra el gif de carga mientras se envia la informacion al servidor
     */
    export function hideSpinner(): void {
        document.getElementById('loading').hidden = true;
    }

    /**
     * Oculta el gif de carga mientras se envia la informacion al servidor
     */
    export function showSpinner(): void {
        document.getElementById('loading').hidden = false;
    }

    /**
     * Limpia los campos del formulario una vez enviados los datos
     */
    export function clearTextBoxForm(): void {
        inputNombre = <HTMLInputElement>document.getElementById('nombre');
        inputApellido = <HTMLInputElement>document.getElementById('apellido');
        inputEdad = <HTMLInputElement>document.getElementById('edad');

        inputNombre.value = "";
        inputApellido.value = "";
        inputEdad.value = "";
    }

    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    export function clearBorderTextBoxForm(): void {
        document.getElementById('nombre').className = "noError";
        document.getElementById('apellido').className = "noError";
        document.getElementById('edad').className = "noError";
        document.getElementById('sexo').className = "noError";
    }
}