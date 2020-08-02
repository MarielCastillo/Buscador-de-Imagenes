import React, { Component } from 'react';
import Buscador from './Components/Buscador'
import Resultado from './Components/Resultado';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            termino: '',
            imagenes: [],
            pagina: ''
        };
    }

    scroll = () => {
        const elemento = document.querySelector('.jumbotron');
        elemento.scrollIntoView('smooth', 'start');
    }

    paginaAnterior = () => {
        //leer el state de la pagina actual
        let pagina = this.state.pagina;
        // leer si la pagina es 1, ya no ir hacia atras
        if(pagina === 1)return null;
        // resta uno a la pagina actual
        pagina -= 1;
        //agregar el cambio al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });
    }

    paginaSiguiente = () => {
        //leer el state de la pagina actual
        let pagina = this.state.pagina;
        // sumar uno a la pagina actual
        pagina += 1;
        //agregar el cambio al state
        this.setState({
            pagina
        }, () => {
            this.consultarApi();
            this.scroll();
        });

        // console.log(pagina);
    }

    consultarApi = () => {
        const termino = this.state.termino;
        const pagina = this.state.pagina;
        const url = `https://pixabay.com/api/?key=17727847-8dbd44a6ed6c234ddfbaf025b&q=${termino}&per_page=32&page=${pagina}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(res => this.setState({imagenes:res.hits}))
    }

    //lo que viene del buscador va a consultar api
    datosBusqueda = (termino) => {
        this.setState({
            termino: termino,
            pagina: 1
        }, () => {
            this.consultarApi();
        })
    }

    render(){
        return (
          <div className="container">
              <div className="jumbotron">
                  <p className="lead text-center">Buscador de Imagenes</p>
                  <Buscador datosBusqueda={this.datosBusqueda} />
              </div>
                <div className="row justify-content-center">
                    <Resultado 
                        imagenes={this.state.imagenes}
                        paginaAnterior={this.paginaAnterior}
                        paginaSiguiente={this.paginaSiguiente}
                    />
                </div>
          </div>
        );
    }
}

export default App;
