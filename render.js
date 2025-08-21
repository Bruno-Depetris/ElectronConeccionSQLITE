// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM listo');
    console.log('mandiraAPI disponible:', !!window.mandiraAPI);
    console.log('Métodos disponibles:', Object.keys(window.mandiraAPI || {}));
    
    try {
        // 1. Probar conexión
        const conexionResult = await window.mandiraAPI.comprobarConectar();
        console.log('Resultado conexión:', conexionResult);
        
        // 2. Probar crear cartera
        const nuevaCartera = {
            Nombre: "Cartera de Prueba",
            Descripcion: "Esta es una cartera de prueba",
            Precio: 150.50,
            Stock: 10,
            Imagen: "prueba.jpg",
            Fecha_Ingreso: new Date().toISOString()
        };
        
        const resultado = await window.mandiraAPI.crearCartera(nuevaCartera);
        console.log('Resultado crear cartera:', resultado);
        
        if (resultado.success) {
            console.log('✅ Cartera creada exitosamente:', resultado.data);
            
            // 3. Probar obtener todas las carteras
            const carteras = await window.mandiraAPI.obtenerCarteras();
            console.log('Todas las carteras:', carteras);
            
        } else {
            console.error('❌ Error al crear cartera:', resultado.error);
        }
        
    } catch (error) {
        console.error('Error general:', error);
    }
});