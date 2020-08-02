import React, {Component} from 'react';

class Buscador extends Component{

    //lee el input
    busquedaRef = React.createRef()

    obtenerDatos = (e) => {
        e.preventDefault();

        console.log(this.busquedaRef.current.value);

        //Tomamos el valor del input
        const termino = this.busquedaRef.current.value;
        
        //Lo enviamos al componente principal (App)
        this.props.datosBusqueda(termino);
    }

    render() {
        return(
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input ref={this.busquedaRef} type="text" className="form-control form-control-lg" 
                        placeholder="Busca tu Imagen. Ejemplo: Cafe" />
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" 
                        value="Buscar" />
                    </div>
                </div>
            </form>
        )
    }
}

export default Buscador;
