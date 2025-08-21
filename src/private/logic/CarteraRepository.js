const Conectar = require("../database/Conectar");


class carteraRepository {
    constructor() {
        this.conectar = new Conectar();
    }
    static getInstance() {
        if (!carteraRepository.instance) {
            carteraRepository.instance = new carteraRepository();
        }
        return carteraRepository.instance;
    }
    crearCartera(cartera) {
        try {
            if (!cartera || !cartera.esValido()) {
                throw new Error("Cartera no válida");
            }   
            const db = this.conectar.obtenerConexion();
            const sql = 'INSERT INTO cartera (Nombre, Descripcion, Precio, Stock, Imagen, Fecha_Ingreso) VALUES (?, ?, ?, ?, ?, ?)';
            const stmt = db.prepare(sql);
            const result = stmt.run(
                cartera.Nombre,
                cartera.Descripcion,
                cartera.Precio,             
                cartera.Stock,
                cartera.Imagen,
                cartera.Fecha_Ingreso
            );
            cartera.CarteraID = result.lastInsertRowid; // Asigna el ID generado
            return cartera; // Retorna la cartera creada con su ID
        } catch (error) {
            console.error(`Error al crear cartera: ${error.message}`);
            throw error;
        }
    }
    obtenerCarteras() { 
        try {
            const db = this.conectar.obtenerConexion();
            const sql = 'SELECT * FROM Cartera';
            return db.prepare(sql).all();
        } catch (error) {
            console.error(`Error al obtener carteras: ${error.message}`);
            throw error;
        }
    }
    obtenerCarteraPorId(id) {
        try {
            const db = this.conectar.obtenerConexion();
            const sql = 'SELECT * FROM Cartera WHERE CarteraID = ?';
            return db.prepare(sql).get(id);
        } catch (error) {
            console.error(`Error al obtener cartera por ID: ${error.message}`);
            throw error;
        }
    }
    actualizarCartera(cartera) {
        try {
            if (!cartera || !cartera.esValido()) {
                throw new Error("Cartera no válida");
            }

            const db = this.conectar.obtenerConexion();
            const sql = 'UPDATE Cartera SET Nombre = ?, Descripcion = ?, Precio = ?, Stock = ?, Imagen = ?, Fecha_Ingreso = ? WHERE CarteraID = ?';
            const stmt = db.prepare(sql);
            const result = stmt.run(
                cartera.Nombre,
                cartera.Descripcion,
                cartera.Precio,
                cartera.Stock,
                cartera.Imagen,
                cartera.Fecha_Ingreso,
                cartera.CarteraID
            );
            return result.changes > 0; // Retorna true si se actualizó al menos una fila
        } catch (error) {
            console.error(`Error al actualizar cartera: ${error.message}`);
            throw error;
        }
    }

    eliminarCartera(id) {
        try {
            const db = this.conectar.obtenerConexion();
            const sql = 'DELETE FROM Cartera WHERE CarteraID = ?';
            const stmt = db.prepare(sql);
            const result = stmt.run(id);
            return result.changes > 0; // Retorna true si se eliminó al menos una fila
        } catch (error) {
            console.error(`Error al eliminar cartera: ${error.message}`);
            throw error;
        }
    }
}


module.exports = carteraRepository;