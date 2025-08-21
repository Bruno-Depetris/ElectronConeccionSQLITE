const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");
const os = require("os");

class Conectar {
    constructor() {

        this.appDataFolder = this.getAppDataPath("Mandira"); 
        this.pathDBAppData = path.join(this.appDataFolder, "MandiraBaseDatos.db");
        this.cadenaAppData = this.pathDBAppData; // En better-sqlite3 solo necesitamos la ruta
        this.backupFolder = this.getAppDataPath("BackUpAllResto");
        this.BackUp = path.join(this.backupFolder, "MandiraBaseDatos.db");
        this.datos = "";
        this.db = null;
    }

    /**
     * Obtiene la ruta de AppData equivalente según el sistema operativo
     * @param {string} appName - Nombre de la aplicación
     * @returns {string} Ruta de datos de la aplicación
     */
    getAppDataPath(appName) {
        const platform = os.platform();
        const homeDir = os.homedir();
        
        switch (platform) {
            case 'win32': // Windows
                return path.join(process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming'), appName);
            
            case 'darwin': // macOS
                return path.join(homeDir, 'Library', 'Application Support', appName);
            
            case 'linux': // Linux
            default:
                return path.join(homeDir, '.local', 'share', appName);
        }
    }

    /**
     * Comprueba y crea las carpetas y base de datos si no existen
     */
    comprobar() {
        try {
            // Crear carpeta principal
            if (!fs.existsSync(this.appDataFolder)) {
                fs.mkdirSync(this.appDataFolder, { recursive: true });
                console.log(`Carpeta '${path.basename(this.appDataFolder)}' creada con éxito.`);
            } else {
                console.log(`Carpeta '${path.basename(this.appDataFolder)}' encontrada con éxito.`);
            }

            // Crear base de datos si no existe
            if (!fs.existsSync(this.pathDBAppData)) {
                // better-sqlite3 crea automáticamente el archivo al instanciar
                const tempDb = new Database(this.pathDBAppData);
                tempDb.close();
                console.log("Base de datos creada en AppData.");
            }

            return true;
        } catch (error) {
            console.error(`Error en comprobar(): ${error.message}`);
            return false;
        }
    }

    /**
     * Crea una copia de seguridad de la base de datos
     * @returns {string} Ruta del backup o "error" si falla
     */
    crearBackUp() {
        try {
            // Crear carpeta de backup
            if (!fs.existsSync(this.backupFolder)) {
                fs.mkdirSync(this.backupFolder, { recursive: true });
                console.log("Carpeta de respaldo creada con éxito.");
            }

            // Copiar base de datos
            if (fs.existsSync(this.pathDBAppData)) {
                fs.copyFileSync(this.pathDBAppData, this.BackUp);
                console.log("Respaldo creado correctamente.");
                return this.BackUp;
            } else {
                console.log("No se encontró la base de datos para respaldar.");
                return "no_database";
            }
        } catch (error) {
            console.error(`Error al crear backup: ${error.message}`);
            return "error";
        }
    }

    /**
     * Obtiene la conexión a la base de datos
     * @returns {Database|null} Instancia de la base de datos o null si hay error
     */
    obtenerConexion() {
        try {
            // Comprobar que todo esté configurado
            if (!this.comprobar()) {
                throw new Error("Error al comprobar la configuración de la base de datos");
            }

            // Si ya hay una conexión abierta, cerrarla
            if (this.db) {
                this.db.close();
            }

            // Crear nueva conexión
            this.db = new Database(this.pathDBAppData);
            console.log("Conexión a la base de datos establecida correctamente.");
            
            return this.db;
        } catch (error) {
            console.error(`Error al obtener la conexión: ${error.message}`);
            throw error;
        }
    }

    /**
     * Cierra la conexión a la base de datos
     */
    cerrarConexion() {
        if (this.db) {
            try {
                this.db.close();
                this.db = null;
                console.log("Conexión a la base de datos cerrada.");
            } catch (error) {
                console.error(`Error al cerrar la conexión: ${error.message}`);
            }
        }
    }

    /**
     * Método para probar la conexión (equivalente a tu decirHola original)
     */
    decirHola() {
        try {
            console.log("=== INFORMACIÓN DE CONEXIÓN ===");
            console.log(`Sistema operativo: ${os.platform()}`);
            console.log(`Carpeta de la app: ${this.appDataFolder}`);
            console.log(`Base de datos: ${this.pathDBAppData}`);
            console.log(`Carpeta de backup: ${this.backupFolder}`);
            console.log("==================================");
            
            // Comprobar que todo esté bien
            const conexionExitosa = this.comprobar();
            
            return {
                mensaje: "¡Hola! La conexión se estableció correctamente.",
                rutas: {
                    appData: this.appDataFolder,
                    baseDatos: this.pathDBAppData,
                    backup: this.backupFolder
                },
                so: os.platform(),
                conexionExitosa
            };
        } catch (error) {
            console.error(`Error en decirHola(): ${error.message}`);
            return {
                mensaje: "Error al establecer la conexión",
                error: error.message
            };
        }
    }

    /**
     * Método utilitario para ejecutar consultas
     * @param {string} sql - Consulta SQL a ejecutar
     * @param {Array} params - Parámetros para la consulta
     * @returns {*} Resultado de la consulta
     */
    ejecutarConsulta(sql, params = []) {
        try {
            if (!this.db) {
                this.obtenerConexion();
            }
            
            const stmt = this.db.prepare(sql);
            return stmt.all(params);
        } catch (error) {
            console.error(`Error al ejecutar consulta: ${error.message}`);
            throw error;
        }
    }
}

module.exports = Conectar;





// class Conectar {
//     constructor() {
//         // Constructor
//     }

//     decirHola() {
//         console.log("HOLAS desde Conectar.js");
//         return "¡Hola! La conexión se estableció correctamente.";
//     }
// }

// module.exports = Conectar;






// class Conectar {




//     constructor() {
//         const paths = envPaths("Mandira"); // tu appName

//         // carpeta de configuración/datos según SO
//         this.appDataFolder = paths.data;
//         this.backupFolder = path.join(paths.data, "BackUpAllResto");

//         this.pathDBAppData = path.join(this.appDataFolder, "MandiraBaseDatos.db");
//         this.backupFile = path.join(this.backupFolder, "MandiraBaseDatos.db");

//         this.db = null;
//     }

//     comprobar() {

//         if (!fs.existsSync(this.appDataFolder)) {
//             fs.mkdirSync(this.appDataFolder, { recursive: true });
//             console.log("Carpeta de datos creada con éxito:", this.appDataFolder);
            
//             return "esta pasando algo"
//         }

//         if (!fs.existsSync(this.pathDBAppData)) {
//             fs.writeFileSync(this.pathDBAppData, ""); 
//             console.log("Base de datos creada en:", this.pathDBAppData);

//             return "esta pasando algo"
//         }

//         return "no esta pasando algo"
//     }

//     crearBackup() {
//         if (!fs.existsSync(this.backupFolder)) {
//             fs.mkdirSync(this.backupFolder, { recursive: true });
//         }

//         if (fs.existsSync(this.pathDBAppData)) {
//             fs.copyFileSync(this.pathDBAppData, this.backupFile);
//             console.log("Backup creado en:", this.backupFile);
//             return this.backupFile;
//         }
//         return null;
//     }

//     obtenerConexion() {
//         this.comprobar();
//         if (!this.db) {
//             this.db = new Database(this.pathDBAppData);
//             console.log("Conexión abierta:", this.pathDBAppData);
//         }
//         return this.db;
//     }
// }

// export default Conectar;
