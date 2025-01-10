// Configuración de Firebase
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function guardarDatos() {
    var cuenta = document.getElementById('cuenta').value;
    var fechaAgregada = new Date();
    var fechaAgregadaFormateada = fechaAgregada.toLocaleDateString() + ' ' + fechaAgregada.toLocaleTimeString();
    var fechaVencimiento = new Date(fechaAgregada);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 29);
    var fechaVencimientoFormateada = fechaVencimiento.toLocaleDateString() + ' ' + fechaVencimiento.toLocaleTimeString();

    if (cuenta) {
        db.collection("cuentas").add({
            cuenta: cuenta,
            fechaAgregada: fechaAgregadaFormateada,
            estado: 'Disponible',
            vendidaA: '',
            fechaCompra: '',
            fechaVencimiento: fechaVencimientoFormateada,
            vendidaPor: ''
        })
        .then(function(docRef) {
            console.log("Documento escrito con ID: ", docRef.id);
            cargarDatos();
        })
        .catch(function(error) {
            console.error("Error al añadir documento: ", error);
            alert("Error al guardar los datos: " + error.message);
        });

        document.getElementById('cuenta').value = '';
    } else {
        alert('Por favor, ingrese los datos de la cuenta.');
    }
}

function cargarDatos() {
    var tableBody = document.getElementById('datos-body');
    tableBody.innerHTML = '';

    db.collection("cuentas").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            var row = document.createElement('tr');
            row.setAttribute('data-id', doc.id);

            var cellCuenta = document.createElement('td');
            var cellFechaAgregada = document.createElement('td');
            var cellEstado = document.createElement('td');
            var cellVendidaA = document.createElement('td');
            var cellFechaCompra = document.createElement('td');
            var cellFechaVencimiento = document.createElement('td');
            var cellVendidaPor = document.createElement('td');
            var cellCopiar = document.createElement('td');

            cellCuenta.textContent = data.cuenta;
            cellFechaAgregada.textContent = data.fechaAgregada;
            cellEstado.innerHTML = '<span class="status-' + (data.estado === 'Vendido' ? 'sold' : 'available') + '">' + data.estado + '</span>';
            cellVendidaA.innerHTML = '<input type="email" value="' + data.vendidaA +