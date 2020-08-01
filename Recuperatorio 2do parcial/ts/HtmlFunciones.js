var General;
(function (General) {
    // variable para almacenar el dato de la fila seleccionada
    var trClick;
    // Lista de personas
    var listaClientes = new Array();
    // variables para manejar los datos del formulario con el DOM
    var inputId = document.getElementById('id');
    var inputNombre = document.getElementById('nombre');
    var inputApellido = document.getElementById('apellido');
    var inputEdad = document.getElementById('edad');
    var inputSexo = document.getElementById('sexo');
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
    function newRow(jsonObject) {
        var newRow = document.createElement('tr');
        // Agrego el id
        var newCellId = document.createElement('td');
        newCellId.setAttribute("name", "tdId");
        var textNodeId = document.createTextNode(jsonObject.id);
        newCellId.appendChild(textNodeId);
        newRow.appendChild(newCellId);
        // Agrego el nombre
        var newCellNombre = document.createElement('td');
        newCellNombre.setAttribute("name", "tdNombre");
        var textNodeNombre = document.createTextNode(jsonObject.nombre);
        newCellNombre.appendChild(textNodeNombre);
        newRow.appendChild(newCellNombre);
        // Agrego el apellido
        var newCellApellido = document.createElement('td');
        newCellApellido.setAttribute("name", "tdApellido");
        var textNodeApellido = document.createTextNode(jsonObject.apellido);
        newCellApellido.appendChild(textNodeApellido);
        newRow.appendChild(newCellApellido);
        // Agrego la edad
        var newCellEdad = document.createElement('td');
        newCellEdad.setAttribute("name", "tdEdad");
        var textNodeEdad = document.createTextNode(jsonObject.edad);
        newCellEdad.appendChild(textNodeEdad);
        newRow.appendChild(newCellEdad);
        // Agrego el sexo
        var newCellSexo = document.createElement('td');
        newCellSexo.setAttribute("name", "tdSexo");
        var textNodeSexo = document.createTextNode(jsonObject.sexo);
        newCellSexo.appendChild(textNodeSexo);
        newRow.appendChild(newCellSexo);
        // Evento click, llama a la funcion 'clickRow'
        newRow.addEventListener('click', clickRow);
        // Agrego la fila completa al cuerpo
        document.querySelector('tbody').appendChild(newRow);
    }
    General.newRow = newRow;
    /**
    * Recorre los datos del objeto JSON para ir formando la tabla
    * @param {*} jsonObject
    */
    function loadJsonObjectToHtml(jsonObject) {
        for (var i = 0; i < jsonObject.length; i++) {
            newRow(jsonObject[i]);
        }
    }
    General.loadJsonObjectToHtml = loadJsonObjectToHtml;
    /**
     * Comprueba que se completen todos los campos del formulario y llama a las funciones para agregar un nuevo cliente en la lista y en la tabla de index.html
     */
    function newPerson() {
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var edad = document.getElementById('edad');
        var sexo = document.getElementById('sexo');
        if (newCustomer(findNextId())) {
            if (confirm("¿Esta seguro que desea agregar un nuevo cliente?")) {
                var sex = sexo.value;
                if (sex == "1") {
                    sex = "Masculino";
                }
                else {
                    sex = "Femenino";
                }
                var data = { id: findNextId(), nombre: nombre.value, apellido: apellido.value, edad: edad.value, sexo: sex };
                saveNewCustomer(data);
                changeLabelNewPersonForm();
            }
        }
    }
    General.newPerson = newPerson;
    /**
     * Agrega una nuevo auto en la lista de vehiculos
     * @param id
     */
    function newCustomer(id) {
        var value = false;
        var nombre = document.getElementById('nombre');
        var apellido = document.getElementById('apellido');
        var edad = document.getElementById('edad');
        var sexo = document.getElementById('sexo');
        if (General.validString(nombre.value)) {
            if (General.validString(apellido.value)) {
                if (General.validNumber(edad.value)) {
                    var customer = new General.Cliente(id, nombre.value, apellido.value, Number.parseInt(edad.value), sexo.value);
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
    General.newCustomer = newCustomer;
    /**
     * Bloquea la pagina con un spinner y agrega un nuevo vehiculo en la tabla
     * @param {*} jsonObject
     */
    function saveNewCustomer(jsonObject) {
        loadPromise().then(function () {
            newRow(jsonObject);
        })["catch"](function () {
            alert("Se produjo un error el servidor. No se pudo procesar la informacion.");
        });
    }
    General.saveNewCustomer = saveNewCustomer;
    /**
     * Elimina un vehiculo de la tabla
     * @param id
     */
    function removeCustomer(id) {
        listaClientes.filter(function (item) {
            if (item.getId() == id) {
                listaClientes.splice(id - 1, 1);
            }
        });
    }
    General.removeCustomer = removeCustomer;
    /**
     * Muestra un spinner durante 3 segundos mientras se graba la informacion en la lista
     */
    function loadPromise() {
        return new Promise(function (resolve, reject) {
            showSpinner();
            setTimeout(function () {
                hideSpinner();
                resolve();
                reject();
            }, 2000);
        });
    }
    General.loadPromise = loadPromise;
    /**
     * Obtiene el siguiente ID de la lista
     */
    function findNextId() {
        var nextId = listaClientes.reduce(function (prev, next) {
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
     * Elimina la fila seleccionada en el formulario
     * @param {*} event
     */
    function clickRow(event) {
        showInfoRow(event);
    }
    General.clickRow = clickRow;
    function deletePerson(event) {
        if (confirm("Desea eliminar el cliente?")) {
            loadPromise().then(function () {
                var index = Number.parseInt(inputId.value);
                console.log(index);
                removeCustomer(index);
                trClick.remove();
            })["catch"](function () {
                alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
            });
            changeLabelNewPersonForm();
        }
    }
    General.deletePerson = deletePerson;
    /**
     * Abre el formulario al realizar 'clic' sobre la fila y carga los datos de la misma en los campos del formulario
     * @param {*} event
     */
    function showInfoRow(event) {
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
    General.showInfoRow = showInfoRow;
    /**
     * Elimina los datos de la tabla
     */
    function clearTable() {
        document.getElementById('limpiar-tabla').addEventListener('click', function () {
            var bodyTable = document.querySelector('tbody');
            bodyTable.innerHTML = "";
        });
    }
    General.clearTable = clearTable;
    /**
     * Elimina los datos de la tabla en index.html
     */
    function deleteTable() {
        var bodyTable = document.querySelector('tbody');
        bodyTable.innerHTML = "";
        listaClientes.filter(function (item) {
            if (item.getId() > 0) {
                listaClientes.splice(0, listaClientes.length);
            }
        });
    }
    General.deleteTable = deleteTable;
    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo masculino. Carga la tabla con los datos filtrados.
     */
    function filterByMale() {
        var male = listaClientes.filter(function (item) {
            return item.getSexo() == "Masculino";
        });
        deleteTable();
        loadPromise().then(function () {
            male.forEach(function (item) {
                newRow(item);
            });
        })["catch"](function () {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }
    General.filterByMale = filterByMale;
    /**
     * Recorre la lista de clientes y devuelve un array con los clientes de sexo femenino. Carga la tabla con los datos filtrados.
     */
    function filterByFemale() {
        var female = listaClientes.filter(function (item) {
            return item.getSexo() == "Femenino";
        });
        deleteTable();
        loadPromise().then(function () {
            female.forEach(function (item) {
                newRow(item);
            });
        })["catch"](function () {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }
    General.filterByFemale = filterByFemale;
    /**
     * Recorre la lista de clientes y devuelve un array con toda la informacion contenida. Carga la tabla con los datos filtrados.
     */
    function filterAll() {
        deleteTable();
        loadPromise().then(function () {
            listaClientes.forEach(function (item) {
                newRow(item);
            });
        })["catch"](function () {
            alert("Se produjo un error en el servidor. No se pudo procesar la informacion.");
        });
    }
    General.filterAll = filterAll;
    /**
     * Oculta la/s columna/s con los datos en funcion de las opciones tildadas / destildadas del checkbox
     */
    function filterByCheckOption() {
        var optionId = document.getElementById('id-filter');
        var optionNombre = document.getElementById('nombre-filter');
        var optionApellido = document.getElementById('apellido-filter');
        var optionEdad = document.getElementById('edad-filter');
        optionId.addEventListener('click', function () {
            var radioId = document.getElementsByName('tdId');
            if (optionId.checked) {
                document.getElementById('thId').hidden = false;
                radioId.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thId').hidden = true;
                radioId.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        optionNombre.addEventListener('click', function () {
            var radioMarca = document.getElementsByName('tdNombre');
            if (optionNombre.checked) {
                document.getElementById('thNombre').hidden = false;
                radioMarca.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thNombre').hidden = true;
                radioMarca.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        optionApellido.addEventListener('click', function () {
            var radioModelo = document.getElementsByName('tdApellido');
            if (optionApellido.checked) {
                document.getElementById('thApellido').hidden = false;
                radioModelo.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thApellido').hidden = true;
                radioModelo.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
        optionEdad.addEventListener('click', function () {
            var radioPrecio = document.getElementsByName('tdEdad');
            if (optionEdad.checked) {
                document.getElementById('thEdad').hidden = false;
                radioPrecio.forEach(function (item) {
                    item.hidden = false;
                });
            }
            else {
                document.getElementById('thEdad').hidden = true;
                radioPrecio.forEach(function (item) {
                    item.hidden = true;
                });
            }
        });
    }
    General.filterByCheckOption = filterByCheckOption;
    /**
     * Calcula el promedio de edad de los clientes de la tabla
     */
    function averagePrice() {
        var average = listaClientes.reduce(function (prev, next) {
            prev += next.getEdad();
            return prev;
        }, 0);
        average /= listaClientes.length;
        var inputPromedio = document.getElementById('edad-promedio');
        inputPromedio.value = average.toString();
    }
    General.averagePrice = averagePrice;
    /**
     * Muestra u oculta el formulario dependiendo de la accion del boton "Nueva persona" / "Cerrar formulario"
     * @param {*} event
     */
    function newPersonForm(event) {
        event.preventDefault();
        document.getElementById('addFormDataButton').hidden = false;
        document.getElementById('deleteFormDataButton').hidden = true;
        changeLabelNewPersonForm();
        console.log(listaClientes);
    }
    General.newPersonForm = newPersonForm;
    /**
     * Muestra el formulario
     */
    function showForm() {
        document.getElementById('container').hidden = false;
    }
    General.showForm = showForm;
    /**
     * Oculta el formulario
     */
    function hideForm() {
        document.getElementById('container').hidden = true;
    }
    General.hideForm = hideForm;
    /**
     * Deshabilita el comportamiento por defecto del boton para cerrar el formulario
     * @param event
     */
    function disableEventDefaultCloseButton(event) {
        event.preventDefault();
        changeLabelNewPersonForm();
    }
    General.disableEventDefaultCloseButton = disableEventDefaultCloseButton;
    /**
     * Cambia el texto del boton 'Alta / Cerrar formulario' cada vez que se selecciona
     */
    function changeLabelNewPersonForm() {
        var visibleForm = document.getElementById('container').hidden;
        var addFormLabel = document.getElementById('openForm');
        inputId = document.getElementById('id');
        if (visibleForm == true) {
            showForm();
            var nextId = findNextId() + 1;
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
    General.changeLabelNewPersonForm = changeLabelNewPersonForm;
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
        inputNombre = document.getElementById('nombre');
        inputApellido = document.getElementById('apellido');
        inputEdad = document.getElementById('edad');
        inputNombre.value = "";
        inputApellido.value = "";
        inputEdad.value = "";
    }
    General.clearTextBoxForm = clearTextBoxForm;
    /**
     * Limpia los bordes de los cuadros de texto con su color por defecto
     */
    function clearBorderTextBoxForm() {
        document.getElementById('nombre').className = "noError";
        document.getElementById('apellido').className = "noError";
        document.getElementById('edad').className = "noError";
        document.getElementById('sexo').className = "noError";
    }
    General.clearBorderTextBoxForm = clearBorderTextBoxForm;
})(General || (General = {}));
