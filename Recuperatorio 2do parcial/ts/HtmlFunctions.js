var General;
(function (General) {
    // variable para almacenar el dato de la fila seleccionada
    var trClick;
    // Lista de personas
    var arrayCustomers = new Array();
    // variables para manejar los datos del formulario con el DOM
    var inputId = document.getElementById('id');
    var inputName = document.getElementById('name');
    var inputSurname = document.getElementById('surname');
    var inputAge = document.getElementById('age');
    var inputSex = document.getElementById('sex');
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
    function newRow(jsonObject) {
        var newRow = document.createElement('tr');
        // Agrego el id
        var newCellId = document.createElement('td');
        newCellId.setAttribute("name", "tdId");
        var textNodeId = document.createTextNode(jsonObject.id);
        newCellId.appendChild(textNodeId);
        newRow.appendChild(newCellId);
        // Agrego el nombre
        var newCellName = document.createElement('td');
        newCellName.setAttribute("name", "tdName");
        var textNodeName = document.createTextNode(jsonObject.name);
        newCellName.appendChild(textNodeName);
        newRow.appendChild(newCellName);
        // Agrego el apellido
        var newCellSurname = document.createElement('td');
        newCellSurname.setAttribute("name", "tdSurname");
        var textNodeSurname = document.createTextNode(jsonObject.surname);
        newCellSurname.appendChild(textNodeSurname);
        newRow.appendChild(newCellSurname);
        // Agrego la edad
        var newCellAge = document.createElement('td');
        newCellAge.setAttribute("name", "tdAge");
        var textNodeAge = document.createTextNode(jsonObject.age);
        newCellAge.appendChild(textNodeAge);
        newRow.appendChild(newCellAge);
        // Agrego el sexo
        var newCellSex = document.createElement('td');
        newCellSex.setAttribute("name", "tdSex");
        var textNodeSex = document.createTextNode(jsonObject.sex);
        newCellSex.appendChild(textNodeSex);
        newRow.appendChild(newCellSex);
        // Agrego el boton 'Eliminar'
        var newButton = document.createElement('button');
        newButton.setAttribute("id", "delete");
        var textNodeAction = document.createTextNode("Eliminar");
        newButton.appendChild(textNodeAction);
        newButton.addEventListener('click', removeRowCustomer);
        newRow.appendChild(newButton);
        // Evento click, llama a la funcion 'clickRow'
        newRow.addEventListener('dblclick', doubleClickRow);
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }
    General.newRow = newRow;
    /**
     * Llama a las funciones 'validateFormData' y 'addNewRowCustomer' para validar y agregar un nuevo cliente en la lista y en la tabla de index.html
     */
    function newCustomer() {
        var id = findNextId() + 1;
        var name = document.getElementById('name');
        var surname = document.getElementById('surname');
        var age = document.getElementById('age');
        var sex = document.getElementById('sex');
        var enumSex;
        if (validateFormData(name.value, surname.value, age.value)) {
            if (confirm("¿Esta seguro que desea agregar un nuevo cliente?")) {
                if (sex.value == "1") {
                    var data = { id: id, name: name.value, surname: surname.value, age: age.value, sex: "Masculino" };
                    var customer = new General.Customer(id, name.value, surname.value, Number.parseInt(age.value), enumSex = General.ESex.Male);
                    arrayCustomers.push(customer);
                    newRowCustomer(data);
                }
                else {
                    var data = { id: id, name: name.value, surname: surname.value, age: age.value, sex: "Femenino" };
                    var customer = new General.Customer(id, name.value, surname.value, Number.parseInt(age.value), enumSex = General.ESex.Female);
                    arrayCustomers.push(customer);
                    newRowCustomer(data);
                }
                changeLabelNewCustomerForm();
            }
        }
    }
    General.newCustomer = newCustomer;
    /**
     * Bloquea la pagina con un spinner y agrega un nuevo cliente en la tabla
     * @param {*} jsonObject
     */
    function newRowCustomer(jsonObject) {
        loadSpinner().then(function () {
            newRow(jsonObject);
        })["catch"](function () {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }
    General.newRowCustomer = newRowCustomer;
    /**
     * Llama a las funciones 'validateFormData' y 'modifyRowCustomer' para validar y modificar un nuevo cliente en la lista y en la tabla de index.html
     */
    function modifyCustomer() {
        var id = trClick.childNodes[0].textContent;
        var name = document.getElementById('name');
        var surname = document.getElementById('surname');
        var age = document.getElementById('age');
        var sex = document.getElementById('sex');
        if (validateFormData(name.value, surname.value, age.value)) {
            if (confirm("¿Esta seguro que desea modificar el cliente?")) {
                if (sex.value == "1") {
                    var data = { id: id, name: name.value, surname: surname.value, age: Number.parseInt(age.value), sex: 0 };
                    modifyRowCustomer(data);
                }
                else {
                    var data = { id: id, name: name.value, surname: surname.value, age: Number.parseInt(age.value), sex: 1 };
                    modifyRowCustomer(data);
                }
                changeLabelNewCustomerForm();
            }
        }
    }
    General.modifyCustomer = modifyCustomer;
    /**
     * Bloquea la pagina con un spinner y modifica el item en el array 'arrayCustomers' y en la fila del cliente seleccionado en la tabla de index.html
     * @param {*} jsonObject
     */
    function modifyRowCustomer(rowData) {
        loadSpinner().then(function () {
            arrayCustomers.filter(function (item) {
                if (item.getId() == rowData.id) {
                    item.setName(rowData.name);
                    item.setSurname(rowData.surname);
                    item.setAge(rowData.age);
                    trClick.childNodes[1].textContent = rowData.name;
                    trClick.childNodes[2].textContent = rowData.surname;
                    trClick.childNodes[3].textContent = rowData.age;
                    if (rowData.sex == 0) {
                        item.setSex(0);
                        trClick.childNodes[4].textContent = "Masculino";
                    }
                    else {
                        item.setSex(1);
                        trClick.childNodes[4].textContent = "Femenino";
                    }
                }
            });
        })["catch"](function () {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }
    General.modifyRowCustomer = modifyRowCustomer;
    /**
     * Elimina un cliente del array 'arrayCustomers'
     * @param id
     */
    function removeCustomer(id) {
        arrayCustomers.filter(function (item) {
            if (item.getId() == id) {
                arrayCustomers.splice(id - 1, 1);
            }
        });
    }
    General.removeCustomer = removeCustomer;
    /**
     * Elimina el cliente de la fila seleccionada en la tabla index.html
     * @param event
     */
    function removeRowCustomer(event) {
        trClick = event.target.parentNode;
        if (confirm("Desea eliminar el cliente?")) {
            loadSpinner().then(function () {
                var index = Number.parseInt(trClick.childNodes[0].textContent);
                removeCustomer(index);
                trClick.remove();
            })["catch"](function () {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
    }
    General.removeRowCustomer = removeRowCustomer;
    /**
     * Valida los campos del formulario
     * @param name
     * @param surname
     * @param age
     */
    function validateFormData(name, surname, age) {
        var value = false;
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
    General.validateFormData = validateFormData;
    /**
     * Muestra un spinner durante 3 segundos mientras se procesa informacion en la pagina
     */
    function loadSpinner() {
        return new Promise(function (resolve, reject) {
            showSpinner();
            setTimeout(function () {
                hideSpinner();
                resolve();
                reject();
            }, 2000);
        });
    }
    General.loadSpinner = loadSpinner;
    /**
     * Obtiene el siguiente ID del array 'arrayCustomers'
     */
    function findNextId() {
        var nextId = arrayCustomers.reduce(function (prev, next) {
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
    General.findNextId = findNextId;
    /**
     * Abre el formulario al realizar 'click' sobre una fila y carga los datos de la misma en los campos del formulario
     * @param {*} event
     */
    function doubleClickRow(event) {
        showForm();
        document.getElementById('addFormDataButton').hidden = true;
        document.getElementById('modifyFormDataButton').hidden = false;
        trClick = event.target.parentNode;
        inputId.value = trClick.childNodes[0].textContent;
        inputName.value = trClick.childNodes[1].textContent;
        inputSurname.value = trClick.childNodes[2].textContent;
        inputAge.value = trClick.childNodes[3].textContent;
        var value = trClick.childNodes[4].textContent;
        if (value == "Masculino") {
            inputSex.value = "1";
        }
        else {
            inputSex.value = "2";
        }
    }
    General.doubleClickRow = doubleClickRow;
    /**
     * Elimina los datos de la tabla en index.html y en arrayCustomers
     */
    function clearTable() {
        document.getElementById('clear-table').addEventListener('click', function () {
            if (arrayCustomers.length != 0) {
                if (confirm("Esta seguro que desea limpiar la tabla?")) {
                    loadSpinner().then(function () {
                        var bodyTable = document.querySelector('tbody');
                        bodyTable.innerHTML = "";
                        arrayCustomers.filter(function (item) {
                            if (item.getId() > 0) {
                                arrayCustomers.splice(item.getId() - 1, arrayCustomers.length);
                            }
                        });
                    })["catch"](function () {
                        alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
                    });
                }
            }
            else {
                alert("La tabla esta vacia. No hay nada para borrar.");
            }
        });
    }
    General.clearTable = clearTable;
    /**
     * Elimina solo los datos de la tabla en index.html
     */
    function deleteTable() {
        var bodyTable = document.querySelector('tbody');
        bodyTable.innerHTML = "";
    }
    General.deleteTable = deleteTable;
    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo masculino. Carga la tabla con los datos filtrados.
     */
    function filterByMale() {
        var male = arrayCustomers.filter(function (item) {
            return item.getSex() == General.ESex.Male;
        });
        if (male.length != 0) {
            loadSpinner().then(function () {
                deleteTable();
                enableCheckboxOptions();
                male.forEach(function (item) {
                    var newMaleRow = { id: item.getId(), name: item.getName(), surname: item.getSurname(), age: item.getAge(), sex: "Masculino" };
                    newRow(newMaleRow);
                });
            })["catch"](function () {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No se encontraron datos de tipo 'Masculino' para filtrar.");
        }
    }
    General.filterByMale = filterByMale;
    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo femenino. Carga la tabla con los datos filtrados.
     */
    function filterByFemale() {
        var female = arrayCustomers.filter(function (item) {
            return item.getSex() == General.ESex.Female;
        });
        if (female.length != 0) {
            loadSpinner().then(function () {
                deleteTable();
                enableCheckboxOptions();
                female.forEach(function (item) {
                    var newFemaleRow = { id: item.getId(), name: item.getName(), surname: item.getSurname(), age: item.getAge(), sex: "Femenino" };
                    newRow(newFemaleRow);
                });
            })["catch"](function () {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No se encontraron datos de tipo 'Femenino' para filtrar.");
        }
    }
    General.filterByFemale = filterByFemale;
    /**
     * Recorre la lista de clientes y devuelve un array con toda la informacion contenida. Carga la tabla con los datos filtrados.
     */
    function filterAll() {
        if (arrayCustomers.length != 0) {
            loadSpinner().then(function () {
                deleteTable();
                enableCheckboxOptions();
                arrayCustomers.forEach(function (item) {
                    if (item.getSex() == General.ESex.Male) {
                        var newMaleRow = { id: item.getId(), name: item.getName(), surname: item.getSurname(), age: item.getAge(), sex: "Masculino" };
                        newRow(newMaleRow);
                    }
                    else {
                        var newFemaleRow = { id: item.getId(), name: item.getName(), surname: item.getSurname(), age: item.getAge(), sex: "Femenino" };
                        newRow(newFemaleRow);
                    }
                });
            })["catch"](function () {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
        }
        else {
            alert("No hay datos en la tabla para filtrar.");
        }
    }
    General.filterAll = filterAll;
    /**
     * Oculta la/s columna/s con los datos en funcion de las opciones tildadas / destildadas del checkbox
     */
    function filterByCheckOption() {
        var optionName = document.getElementById('name-filter');
        var optionSurname = document.getElementById('surname-filter');
        var optionAge = document.getElementById('age-filter');
        var optionSex = document.getElementById('sex-filter');
        // checkbox Name
        optionName.addEventListener('click', function () {
            var checkName = document.getElementsByName('tdName');
            if (optionName.checked) {
                document.getElementById('thName').hidden = false;
                checkName.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thName').hidden = true;
                checkName.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        // checkbox Surname
        optionSurname.addEventListener('click', function () {
            var checkSurname = document.getElementsByName('tdSurname');
            if (optionSurname.checked) {
                document.getElementById('thSurname').hidden = false;
                checkSurname.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thSurname').hidden = true;
                checkSurname.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        // checkbox Age
        optionAge.addEventListener('click', function () {
            var checkAge = document.getElementsByName('tdAge');
            if (optionAge.checked) {
                document.getElementById('thAge').hidden = false;
                checkAge.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thAge').hidden = true;
                checkAge.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        // checkbox Sex
        optionSex.addEventListener('click', function () {
            var checkSex = document.getElementsByName('tdSex');
            if (optionSex.checked) {
                document.getElementById('thSex').hidden = false;
                checkSex.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thSex').hidden = true;
                checkSex.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
    }
    General.filterByCheckOption = filterByCheckOption;
    /**
     * Evento 'change' del boton 'filtrar por' llama a las funciones filterByMale(), filterByFemale() y filterAll()
     */
    function filterBySex() {
        var keyPressFilter = document.getElementById('filter-customers');
        keyPressFilter.addEventListener('change', function (event) {
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
    General.filterBySex = filterBySex;
    /**
     * Tilda los checkboxs deshabilitados
     */
    function enableCheckboxOptions() {
        var optionName = document.getElementById('name-filter');
        var optionSurname = document.getElementById('surname-filter');
        var optionAge = document.getElementById('age-filter');
        var optionSex = document.getElementById('sex-filter');
        if (!optionName.checked) {
            optionName.checked = true;
            document.getElementById('thName').hidden = false;
        }
        if (!optionSurname.checked) {
            optionSurname.checked = true;
            document.getElementById('thSurname').hidden = false;
        }
        if (!optionAge.checked) {
            optionAge.checked = true;
            document.getElementById('thAge').hidden = false;
        }
        if (!optionSex.checked) {
            optionSex.checked = true;
            document.getElementById('thSex').hidden = false;
        }
    }
    General.enableCheckboxOptions = enableCheckboxOptions;
    /**
     * Evento clic del boton 'calcula-promedio' llama a la funcion 'averagePrice'
     */
    function buttonAveragePrice() {
        var keyPressAveragePrice = document.getElementById('calculate-average');
        keyPressAveragePrice.addEventListener('click', function (event) {
            averagePrice();
        });
    }
    General.buttonAveragePrice = buttonAveragePrice;
    /**
     * Calcula el promedio de edad de los clientes de la tabla
     */
    function averagePrice() {
        var inputPromedio = document.getElementById('average-age');
        if (arrayCustomers.length == 0) {
            inputPromedio.value = "0";
        }
        else {
            var average = arrayCustomers.reduce(function (prev, next) {
                prev += next.getAge();
                return prev;
            }, 0);
            average /= arrayCustomers.length;
            inputPromedio.value = average.toFixed(2);
        }
    }
    General.averagePrice = averagePrice;
    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Nuevo cliente" / "Cerrar formulario"
     * @param {*} event
     */
    function newCustomerForm(event) {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        document.getElementById('modifyFormDataButton').hidden = true;
        changeLabelNewCustomerForm();
    }
    General.newCustomerForm = newCustomerForm;
    /**
     * Muestra el formulario
     */
    function showForm() {
        document.getElementById('container').hidden = false;
        document.getElementById('lock-background').hidden = false;
    }
    General.showForm = showForm;
    /**
     * Oculta el formulario
     */
    function hideForm() {
        document.getElementById('container').hidden = true;
        document.getElementById('lock-background').hidden = true;
    }
    General.hideForm = hideForm;
    /**
     * Deshabilita el comportamiento por defecto del boton para cerrar el formulario
     * @param event
     */
    function disableEventDefaultCloseButton(event) {
        event.preventDefault();
        changeLabelNewCustomerForm();
    }
    General.disableEventDefaultCloseButton = disableEventDefaultCloseButton;
    /**
     * Cambia el texto del boton 'Alta / Cerrar formulario' cada vez que se selecciona
     */
    function changeLabelNewCustomerForm() {
        var visibleForm = document.getElementById('container').hidden;
        inputId = document.getElementById('id');
        if (visibleForm == true) {
            showForm();
            var nextId = findNextId() + 1;
            inputId.value = nextId.toString();
            console.log(arrayCustomers);
        }
        else {
            hideForm();
            clearTextBoxForm();
            clearBorderTextBoxForm();
        }
    }
    General.changeLabelNewCustomerForm = changeLabelNewCustomerForm;
    /**
     * Muestra el gif de carga mientras se envia la informacion al servidor
     */
    function hideSpinner() {
        document.getElementById('loading').hidden = true;
    }
    General.hideSpinner = hideSpinner;
    /**
     * Oculta el gif de carga mientras se envia la informacion al servidor
     */
    function showSpinner() {
        document.getElementById('loading').hidden = false;
    }
    General.showSpinner = showSpinner;
    /**
     * Limpia los campos del formulario una vez enviados los datos
     */
    function clearTextBoxForm() {
        inputName = document.getElementById('name');
        inputSurname = document.getElementById('surname');
        inputAge = document.getElementById('age');
        inputSex = document.getElementById('sex');
        inputName.value = "";
        inputSurname.value = "";
        inputAge.value = "";
        inputSex.value = "1";
    }
    General.clearTextBoxForm = clearTextBoxForm;
    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    function clearBorderTextBoxForm() {
        document.getElementById('name').className = "noError";
        document.getElementById('surname').className = "noError";
        document.getElementById('age').className = "noError";
        document.getElementById('sex').className = "noError";
    }
    General.clearBorderTextBoxForm = clearBorderTextBoxForm;
})(General || (General = {}));
