
const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script cargado');

contextBridge.exposeInMainWorld('mandiraAPI', {
    // Operaciones de Cartera
    crearCartera: (datosCartera) => {
        console.log('Llamando a crear-cartera con:', datosCartera);
        return ipcRenderer.invoke('crear-cartera', datosCartera);
    },
    
    obtenerCarteras: () => {
        console.log('Llamando a obtenerCarteras');
        return ipcRenderer.invoke('obtenerCarteras');
    },
    
    obtenerCarteraPorId: (id) => {
        console.log('Llamando a obtenerCarteraPorId con ID:', id);
        return ipcRenderer.invoke('obtenerCarteraPorId', id);
    },
    
    actualizarCartera: (cartera) => {
        console.log('Llamando a actualizarCartera con:', cartera);
        return ipcRenderer.invoke('actualizarCartera', cartera);
    },
    
    // Operación de conexión
    comprobarConectar: () => {
        console.log('Llamando a comprobarConectar');
        return ipcRenderer.invoke('comprobarConectar');
    }
});

console.log('mandiraAPI expuesto con métodos:', Object.keys(window.mandiraAPI || {}));

















// // preload.js
// window.addEventListener("DOMContentLoaded", () => {
//   // Pasamos el ID como string
//   Versiones("veriion", process.versions.node);
// });


// function Versiones(idSelector, compVersion) {
//   let elemento = document.getElementById(idSelector);

//   if (elemento) {
//     elemento.innerText = compVersion;
//   }

  
  
  
// }



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('mandiraAPI', {
//     crearCartera: (datosCartera) => ipcRenderer.invoke('crear-cartera', datosCartera)
// });