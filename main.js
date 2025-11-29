// **Tu configuración de Firebase (la que me proporcionaste)**
const firebaseConfig = {
    apiKey: "AIzaSyDj2tNpNgiZPWtTYKotGq3ULALzJltHOKM",
    authDomain: "pagina-81a41.firebaseapp.com",
    databaseURL: "https://pagina-81a41-default-rtdb.firebaseio.com",
    projectId: "pagina-81a41",
    storageBucket: "pagina-81a41.appspot.com",
    messagingSenderId: "803503362455",
    appId: "1:803503362455:web:ebf1271cf65943210174d2"
};

// Inicializar la aplicación y el módulo de Realtime Database
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// --- Lógica de Seguimiento de Visitas ---

const entryTime = Date.now(); // Marca de tiempo de entrada
// Crea un ID único para esta visita (por ejemplo, "mibonita-visit-" + tiempo de entrada)
const visitorId = 'mibonita-visit-' + entryTime; 

// 1. REGISTRAR ENTRADA
// Guarda el registro inicial de la visita en la base de datos
database.ref('visits/' + visitorId).set({
    entry: new Date(entryTime).toISOString(),
    status: 'active'
});

// 2. REGISTRAR SALIDA Y DURACIÓN
// Usa el evento 'beforeunload' para capturar cuando el usuario cierra o navega fuera de la página
window.addEventListener('beforeunload', function () {
    const exitTime = Date.now();
    const durationMs = exitTime - entryTime;
    const durationSeconds = Math.round(durationMs / 1000); // Duración en segundos

    // Actualiza el registro en la base de datos con la hora de salida y la duración
    database.ref('visits/' + visitorId).update({
        exit: new Date(exitTime).toISOString(),
        duration_seconds: durationSeconds,
        status: 'closed'
    });
});




onload = () =>{
    document.body.classList.remove("container");
};
