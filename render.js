const nuevaCartera = {
    Nombre: 'Cartera de ejemplo',
    Descripcion: 'Cartera de cuero',
    Precio: 50.0,
    Stock: 10,
    Imagen: 'ruta/a/la/imagen.jpg',
    Fecha_Ingreso: '2023-10-01'

}

window.mandiraAPI.crearCartera(nuevaCartera).then(response => {
    console.log('Cartera creada:', response);   

}).catch(error => {
    console.error('Error al crear la cartera:', error);
});

const boton = document.getElementById("sexoanal");
boton.addEventListener('click', () => {
    crearCartera();
});