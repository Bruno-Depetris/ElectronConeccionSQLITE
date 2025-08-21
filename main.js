const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const Conectar = require('./src/private/database/Conectar'); // Ajusta la ruta según tu estructura

const con = new Conectar();


ipcMain.handle('comprobarConectar', () => {
  return con.decirHola()
});

// Función para crear la ventana principal
// Esta función se ejecuta cuando la aplicación está lista
// Sería como el "Main" en una aplicación de consola
// o el "Form Load" en una aplicación de Windows Forms.
// Aquí es donde se configura la ventana principal de la aplicación.
// En este caso, se carga un archivo HTML que será la interfaz de usuario.
// También se establece el "preload.js" para que la ventana pueda comunicarse con el
// proceso principal de Electron de manera segura.
// Además, se configura el tamaño de la ventana y se oculta la barra de menú.
// Finalmente, se carga el archivo HTML que contiene la interfaz de usuario de la aplicación.
// También se establece un manejador de eventos para ejecutar código JavaScript una vez que la ventana
// haya terminado de cargar, lo que permite interactuar con la interfaz de usuario desde el proceso de renderizado.


// Aqui vamos a manejar operaciones para CarteraRepository

ipcMain.handle('crearCartera', async (event, cartera) => {
  const carteraRepo = require('./src/private/logic/CarteraRepository').getInstance();
  try {
    const result = await carteraRepo.CREARcAR(cartera);
    return result;
  } catch (error) {
    console.error(`Error al cargar carteras: ${error.message}`);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}); 

ipcMain.handle('obtenerCarteras', async () => {
  const carteraRepo = require('./src/private/logic/CarteraRepository').getInstance();
  try {
    const carteras = await carteraRepo.obtenerCarteras();
    return carteras;
  } catch (error) {
    console.error(`Error al obtener carteras: ${error.message}`);   
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
}); 

ipcMain.handle('obtenerCarteraPorId', async (event, id) => {
  const carteraRepo = require('./src/private/logic/CarteraRepository').getInstance();
  try {
    const cartera = await carteraRepo.obtenerCarteraPorId(id);
    return cartera;
  } catch (error) {
    console.error(`Error al obtener cartera por ID: ${error.message}`);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
});


ipcMain.handle('actualizarCartera', async (event, cartera) => {
  const carteraRepo = require('./src/private/logic/CarteraRepository').getInstance();
  try {
    const result = await carteraRepo.actualizarCartera(cartera);
    return result;
  } catch (error) {
    console.error(`Error al actualizar cartera: ${error.message}`);
    throw error; // Lanza el error para que pueda ser manejado por el llamador
  }
});

function CrearVentanaPrincipal (){
  let VentanaPrincipal = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
    
  });


  VentanaPrincipal.loadFile('index.html')


}


app.whenReady().then(() => {
    con.comprobar();
    CrearVentanaPrincipal();
});

app.on('before-quit', () => {
    con.cerrarConexion();
});






























// // Importamos "app" y "BrowserWindow" desde el módulo electron
// // Sería parecido a un "using Electron;" en C#
// const { app, BrowserWindow, ipcMain} = require('electron');
// const Conectar = require("./src/private/database/Conectar.js");
// const path = require("path");

// // ipcMain.handle("comprobar-coneccion", () => {
// //   return Conectar.comprobar();
// // })

// ipcMain.handle("decir-hola", () => {
//     console.log("holaddw");
// });

// // -------------------------
// // Función que crea la ventana principal
// // Sería como instanciar un "Form" en WinForms
// // -------------------------
// function createWindow() {

//   // Creamos una nueva ventana (nuestra "ventana principal")
//   const win = new BrowserWindow({
//     width: 800,   // ancho
//     height: 600,  // alto

//     // Configuraciones internas (como propiedades del Form)
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       contextIsolation: true,
//       nodeIntegration: false


//     },

//     autoHideMenuBar: true // oculta el menú superior

    
//   });
//       win.webContents.on("did-finish-load", () => {
//         win.webContents.executeJavaScript("window.api.decirHola();");
//     });
//   // Cargamos el archivo HTML que va a ser la interfaz
//   win.loadFile('index.html');
// }

// // -------------------------
// // Eventos de la aplicación
// // -------------------------

// // Este evento se dispara cuando la app está lista para funcionar
// // Sería como el "OnLoad" global de la aplicación
// app.whenReady().then(() => {
//   createWindow(); // creamos la ventana principal

//   // En macOS es común que la app quede abierta aunque cierres todas las ventanas
//   // Por eso, cuando el usuario "activa" la app sin ventanas abiertas, se vuelve a crear una
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// // Este evento se dispara cuando se cierran todas las ventanas
// // En Windows/Linux -> cierra la app
// // En macOS -> la app sigue viva (por eso el if)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit(); // salir de la aplicación
//   }
// });
