

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


const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('mandiraAPI', {
    cargarCarteras: (cartera) => ipcRenderer.invoke('cargar-carteras', cartera),
    obtenerCarteras: () => ipcRenderer.invoke('obtener-carteras'),
    obtenerCarteraPorId: (id) => ipcRenderer.invoke('obtener-cartera-por-id', id),
    actualizarCartera: (cartera) => ipcRenderer.invoke('actualizar-cartera', cartera)
});
