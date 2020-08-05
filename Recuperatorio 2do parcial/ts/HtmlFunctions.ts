namespace General {

    // variable para almacenar el dato de la fila seleccionada
    var trClick: HTMLInputElement;

    // Lista de personas
    var arrayCustomers: Array<General.Customer> = new Array<General.Customer>();

    // variables para manejar los datos del formulario con el DOM
    var inputId: HTMLInputElement = <HTMLInputElement>document.getElementById('id');
    var inputName: HTMLInputElement = <HTMLInputElement>document.getElementById('name');
    var inputSurname: HTMLInputElement = <HTMLInputElement>document.getElementById('surname');
    var inputAge: HTMLInputElement = <HTMLInputElement>document.getElementById('age');
    var inputSex: HTMLInputElement = <HTMLInputElement>document.getElementById('sex');

    // Eventos llamados cada vez que se carga la pagina
    window.addEventListener('load', hideForm);
    window.addEventListener('load', General.onlyNumbers);
    window.addEventListener('load', buttonAveragePrice);
    window.addEventListener('load', filterBySex);
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
        let newCellName = document.createElement('td');
        newCellName.setAttribute("name", "tdName");
        let textNodeName = document.createTextNode(jsonObject.name);
        newCellName.appendChild(textNodeName);
        newRow.appendChild(newCellName);
    
        // Agrego el apellido
        let newCellSurname = document.createElement('td');
        newCellSurname.setAttribute("name", "tdSurname");
        let textNodeSurname = document.createTextNode(jsonObject.surname);
        newCellSurname.appendChild(textNodeSurname);
        newRow.appendChild(newCellSurname);

        // Agrego la edad
        let newCellAge = document.createElement('td');
        newCellAge.setAttribute("name", "tdAge");
        let textNodeAge = document.createTextNode(jsonObject.age);
        newCellAge.appendChild(textNodeAge);
        newRow.appendChild(newCellAge);

        // Agrego el sexo
        let newCellSex = document.createElement('td');
        newCellSex.setAttribute("name", "tdSex");
        let textNodeSex = document.createTextNode(jsonObject.sex);
        newCellSex.appendChild(textNodeSex);
        newRow.appendChild(newCellSex);
    
        // Agrego el boton 'Eliminar'
        let newButton = document.createElement('button');
        newButton.setAttribute("id", "delete");
        let textNodeAction = document.createTextNode("Eliminar");
        newButton.appendChild(textNodeAction);
        newButton.addEventListener('click', removeRowCustomer);
        newRow.appendChild(newButton);

        // Evento click, llama a la funcion 'clickRow'
        newRow.addEventListener('dblclick', doubleClickRow);
    
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }

    /**
     * Llama a las funciones 'validateFormData' y 'addNewRowCustomer' para validar y agregar un nuevo cliente en la lista y en la tabla de index.html
     */
    export function newCustomer() {
        let id = findNextId() + 1;
        let name = <HTMLInputElement>document.getElementById('name');
        let surname = <HTMLInputElement>document.getElementById('surname');
        let age = <HTMLInputElement>document.getElementById('age');
        let sex = <HTMLInputElement>document.getElementById('sex');
        let enumSex: General.ESex;

        if (validateFormData(name.value, surname.value, age.value, sex.value)) {
            if (confirm("¿Esta seguro que desea agregar un nuevo cliente?")) {
                if (sex.value == "1") {
                    let data = { id:id, name:name.value, surname:surname.value, age:age.value, sex:"Masculino" };
                    let customer: General.Customer = new General.Customer(id, name.value, surname.value, Number.parseInt(age.value), enumSex = General.ESex.Male);
                    arrayCustomers.push(customer);
                    newRowCustomer(data);
                }
                else {
                    let data = { id:id, name:name.value, surname:surname.value, age:age.value, sex:"Femenino" };
                    let customer: General.Customer = new General.Customer(id, name.value, surname.value, Number.parseInt(age.value), enumSex = General.ESex.Female);
                    arrayCustomers.push(customer);
                    newRowCustomer(data);
                }

                changeLabelNewCustomerForm();
            }
        }
    }

    /**
     * Bloquea la pagina con un spinner y agrega un nuevo cliente en la tabla
     * @param {*} jsonObject 
     */
    export function newRowCustomer(jsonObject): void {
        loadSpinner().then(() => {
            newRow(jsonObject);
        }).catch(() => {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Llama a las funciones 'validateFormData' y 'modifyRowCustomer' para validar y modificar un nuevo cliente en la lista y en la tabla de index.html
     */
    export function modifyCustomer() {
        let id = trClick.childNodes[0].textContent;
        let name = <HTMLInputElement>document.getElementById('name');
        let surname = <HTMLInputElement>document.getElementById('surname');
        let age = <HTMLInputElement>document.getElementById('age');
        let sex = <HTMLInputElement>document.getElementById('sex');

        console.log("Sexo: " + sex.value);

        if (validateFormData(name.value, surname.value, age.value, sex.value)) {
            if (confirm("¿Esta seguro que desea modificar el cliente?")) {
                if (sex.value == "1") {
                    let data = { id:id, name:name.value, surname:surname.value, age:Number.parseInt(age.value), sex:0 };
                    modifyRowCustomer(data);
                }
                else {
                    let data = { id:id, name:name.value, surname:surname.value, age:Number.parseInt(age.value), sex:1 };
                    modifyRowCustomer(data);
                }

                changeLabelNewCustomerForm();
            }
        }
    }

    /**
     * Bloquea la pagina con un spinner y modifica el item en el array 'arrayCustomers' y en la fila del cliente seleccionado en la tabla de index.html
     * @param {*} jsonObject 
     */
    export function modifyRowCustomer(rowData): void {
        loadSpinner().then(() => {
            arrayCustomers.filter(item => {
                if (item.getId() == rowData.id) {
                    item.setName(rowData.name);
                    item.setSurname(rowData.surname);
                    item.setAge(rowData.age);

                    trClick.childNodes[1].textContent = rowData.name;
                    trClick.childNodes[2].textContent = rowData.surname;
                    trClick.childNodes[3].textContent = rowData.age;

                    if(rowData.sex == 0) {
                        item.setSex(0);
                        trClick.childNodes[4].textContent = "Masculino";
                    }
                    else {
                        item.setSex(1);
                        trClick.childNodes[4].textContent = "Femenino";
                    }
                }
            });
        }).catch(() => {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }

    /**
     * Elimina un cliente del array 'arrayCustomers'
     * @param id 
     */
    export function removeCustomer(id: number) {
        arrayCustomers.filter(item => {
            if (item.getId() == id) {
                arrayCustomers.splice(id - 1, 1);
            }
        });
    }

    /**
     * Elimina el cliente de la fila seleccionada en la tabla index.html
     * @param event 
     */
    export function removeRowCustomer(event) {
        trClick = event.target.parentNode;

        if (confirm("Desea eliminar el cliente?")) {
            loadSpinner().then(() => {
                let index = Number.parseInt(trClick.childNodes[0].textContent);
                removeCustomer(index);
                trClick.remove();
            }).catch(() => {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
    }

    /**
     * Valida los campos del formulario
     * @param name 
     * @param surname 
     * @param age 
     * @param sex 
     */
    export function validateFormData(name:string, surname: string, age:string, sex: string): boolean {
        let value: boolean = false;
        
        if (General.validString(name)) {
            if (General.validString(surname)) {
                if (General.validNumber(age)) {
                    value = true;
                }
                else {
                    document.getElementById("age").className = "error";
                }
            }
            else {
                document.getElementById("surname").className = "error";
            }
        }
        else {
            document.getElementById("name").className = "error";
        }

        return value;
    }
    
    /**
     * Muestra un spinner durante 3 segundos mientras se procesa informacion en la pagina
     */
    export function loadSpinner() {
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
     * Obtiene el siguiente ID del array 'arrayCustomers'
     */
    export function findNextId(): number {
        let nextId = arrayCustomers.reduce(function(prev, next) {
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
     * Abre el formulario al realizar 'click' sobre una fila y carga los datos de la misma en los campos del formulario
     * @param {*} event 
     */
    export function doubleClickRow(event) {
        document.getElementById('container').hidden = false;
        document.getElementById('addFormDataButton').hidden = true;
        document.getElementById('modifyFormDataButton').hidden = false;

        trClick = event.target.parentNode;

        inputId.value = trClick.childNodes[0].textContent;
        inputName.value = trClick.childNodes[1].textContent;
        inputSurname.value = trClick.childNodes[2].textContent;
        inputAge.value = trClick.childNodes[3].textContent;
        let value = trClick.childNodes[4].textContent;

        if (value == "Masculino") {
            inputSex.value = "1";
        }
        else {
            inputSex.value = "2";
        }
    }

    /**
     * Elimina los datos de la tabla en index.html y en arrayCustomers
     */
    export function clearTable() {
        document.getElementById('clear-table').addEventListener('click', function() {
            
            if (arrayCustomers.length != 0) {
                if (confirm("Esta seguro que desea limpiar la tabla?")) {
                    loadSpinner().then(() => {
                        let bodyTable = document.querySelector('tbody');
                        bodyTable.innerHTML = "";

                        arrayCustomers.filter(item => {
                            if (item.getId() > 0) {
                                arrayCustomers.splice(item.getId() -1, arrayCustomers.length);
                            }
                        });
                    }).catch(() => {
                        alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
                    });
                }
            }
            else {
                alert("La tabla esta vacia. No hay nada para borrar.");
            }
        });
    }
    
    /**
     * Elimina solo los datos de la tabla en index.html
     */
    export function deleteTable() {
        let bodyTable = document.querySelector('tbody');
        bodyTable.innerHTML = "";
    }

    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo masculino. Carga la tabla con los datos filtrados.
     */
    export function filterByMale() {
        let male = arrayCustomers.filter(item => {
            return item.getSex() == General.ESex.Male;
        });

        if (male.length != 0) {
            deleteTable();
            loadSpinner().then(() => {
                male.forEach(item => {
                    let newMaleRow = {id:item.getId(), name:item.getName(), surname:item.getSurname(), age:item.getAge(), sex:"Masculino" };
                    newRow(newMaleRow);
                });
            }).catch(() => {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No se encontraron datos de tipo 'Masculino' para filtrar.");
        }
    }

    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo femenino. Carga la tabla con los datos filtrados.
     */
    export function filterByFemale() {
        let female = arrayCustomers.filter(item => {
            return item.getSex() == General.ESex.Female;
        });

        if (female.length != 0) {
            deleteTable();
            loadSpinner().then(() => {
                female.forEach(item => {
                    let newFemaleRow = {id:item.getId(), name:item.getName(), surname:item.getSurname(), age:item.getAge(), sex:"Femenino" };
                    newRow(newFemaleRow);
                });
            }).catch(() => {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No se encontraron datos de tipo 'Femenino' para filtrar.");
        }
    }

    /**
     * Recorre la lista de clientes y devuelve un array con toda la informacion contenida. Carga la tabla con los datos filtrados.
     */
    export function filterAll() {
        if (arrayCustomers.length != 0) {
            deleteTable();
            loadSpinner().then(() => {
                arrayCustomers.forEach(item => {
                    if (item.getSex() == General.ESex.Male) {
                        let newMaleRow = {id:item.getId(), name:item.getName(), surname:item.getSurname(), age:item.getAge(), sex:"Masculino" };
                        newRow(newMaleRow);
                    }
                    else {
                        let newFemaleRow = {id:item.getId(), name:item.getName(), surname:item.getSurname(), age:item.getAge(), sex:"Femenino" };
                        newRow(newFemaleRow);
                    }
                });
            }).catch(() => {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No hay datos en la tabla para filtrar.");
        }
    }

    /**
     * Oculta la/s columna/s con los datos en funcion de las opciones tildadas / destildadas del checkbox
     */
    export function filterByCheckOption() {
        let optionName = <HTMLInputElement>document.getElementById('name-filter');
        let optionSurname = <HTMLInputElement>document.getElementById('surname-filter');
        let optionAge = <HTMLInputElement>document.getElementById('age-filter');
        let optionSex = <HTMLInputElement>document.getElementById('sex-filter');

        // checkbox Name
        optionName.addEventListener('click', function() {
            let checkName = document.getElementsByName('tdName');

            if (optionName.checked) {
                document.getElementById('thName').hidden = false;
                checkName.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thName').hidden = true;
                checkName.forEach(item => {
                    item.hidden = true;
                });
            }
        });
        
        // checkbox Surname
        optionSurname.addEventListener('click', function() {
            let checkSurname = document.getElementsByName('tdSurname');

            if (optionSurname.checked) {
                document.getElementById('thSurname').hidden = false;
                checkSurname.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thSurname').hidden = true;
                checkSurname.forEach(item => {
                    item.hidden = true;
                });
            }
        });
        
        // checkbox Age
        optionAge.addEventListener('click', function() {
            let checkAge = document.getElementsByName('tdAge');

            if (optionAge.checked) {
                document.getElementById('thAge').hidden = false;
                checkAge.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thAge').hidden = true;
                checkAge.forEach(item => {
                    item.hidden = true;
                });
            }
        });

        // checkbox Sex
        optionSex.addEventListener('click', function() {
            let checkSex = document.getElementsByName('tdSex');

            if (optionSex.checked) {
                document.getElementById('thSex').hidden = false;
                checkSex.forEach(item => {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thSex').hidden = true;
                checkSex.forEach(item => {
                    item.hidden = true;
                });
            }
        });
    }

    /**
     * Evento 'change' del boton 'filtrar por' llama a las funciones filterByMale(), filterByFemale() y filterAll()
     */
    export function filterBySex() {
        let keyPressFilter = <HTMLInputElement>document.getElementById('filter-customers');

        keyPressFilter.addEventListener('change', function(event) {
            if (keyPressFilter.value == "1") {
                filterByMale();
            }
            else if (keyPressFilter.value == "2") {
                filterByFemale();
            }
            else if (keyPressFilter.value == "3") {
                filterAll();
            }
        });
    }

    /**
     * Evento clic del boton 'calcula-promedio' llama a la funcion 'averagePrice'
     */
    export function buttonAveragePrice() {
        let keyPressAveragePrice = <HTMLInputElement>document.getElementById('calculate-average');
        
        keyPressAveragePrice.addEventListener('click', function(event) {
            averagePrice();
        });
    }

    /**
     * Calcula el promedio de edad de los clientes de la tabla
     */
    export function averagePrice() {
        let inputPromedio = <HTMLInputElement>document.getElementById('average-age');

        if (arrayCustomers.length == 0) {
            inputPromedio.value = "0";
        }
        else {
            let average = arrayCustomers.reduce(function(prev, next) {
                prev += next.getAge();
                return prev;
            }, 0);

            average /= arrayCustomers.length;
            inputPromedio.value = average.toFixed(2);
        }
    }

    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Nuevo cliente" / "Cerrar formulario"
     * @param {*} event 
     */
    export function newCustomerForm(event): void {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        document.getElementById('modifyFormDataButton').hidden = true;
        changeLabelNewCustomerForm();
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
        changeLabelNewCustomerForm();
    }

    /**
     * Cambia el texto del boton 'Alta / Cerrar formulario' cada vez que se selecciona
     */
    export function changeLabelNewCustomerForm(): void {
        let visibleForm = document.getElementById('container').hidden;
        let addFormLabel = <HTMLInputElement>document.getElementById('openForm');
        inputId = <HTMLInputElement>document.getElementById('id');

        if (visibleForm == true) {
            console.log(arrayCustomers);
            showForm();
            let nextId = findNextId() + 1;
            inputId.value = nextId.toString();
            addFormLabel.value = "Cerrar formulario";
        }
        else {
            hideForm();
            clearTextBoxForm();
            clearBorderTextBoxForm();
            addFormLabel.value = "Nuevo cliente";
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
        inputName = <HTMLInputElement>document.getElementById('name');
        inputSurname = <HTMLInputElement>document.getElementById('surname');
        inputAge = <HTMLInputElement>document.getElementById('age');
        inputSex = <HTMLInputElement>document.getElementById('sex');

        inputName.value = "";
        inputSurname.value = "";
        inputAge.value = "";
        inputSex.value = "1";
    }

    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    export function clearBorderTextBoxForm(): void {
        document.getElementById('name').className = "noError";
        document.getElementById('surname').className = "noError";
        document.getElementById('age').className = "noError";
        document.getElementById('sex').className = "noError";
    }
}