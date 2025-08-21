class Cartera {
    constructor(CarteraID = 0, Nombre = '', Descripcion = '', Precio = 0.0 , Stock = 0, Imagen = '', Fecha_Ingreso = '') {
        this.CarteraID = CarteraID;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Precio = Precio; 
        this.Stock = Stock;
        this.Imagen = Imagen;
        this.Fecha_Ingreso = Fecha_Ingreso;
    }

    esValido() {
        return this.Nombre && this.Nombre.trim().length > 0;
    }

    toObject(){
        return {
        CarteraID: CarteraID,
        Nombre: Nombre,
        Descripcion: Descripcion,
        Precio: Precio,
        Stock: Stock,
        Imagen: Imagen,
        Fecha_Ingreso: Fecha_Ingreso
        }
    }


    static fromObject(obj){
        return new Cartera(
            obj.CarteraID || obj.CarteraID || 0,
            obj.Nombre || obj.Nombre || ' ',
            obj.Descripcion || obj.Descripcion || ' ',
            obj.Precio || obj.Precio || 0.0,
            obj.Stock || obj.Stock || 0,
            obj.Imagen || obj.Imagen || '',
            obj.Fecha_Ingreso || obj.Fecha_Ingreso || ''

        )
    }
}
