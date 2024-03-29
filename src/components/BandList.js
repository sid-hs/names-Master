import React, {useState, useEffect, useContext} from 'react'
import { SocketContext } from '../context/SocketContext';

//aqui es donde se reciben las constantes

export const BandList = () => {

// export const BandList = ( {data, votar} ) => {


    const [ bands, setBands ] = useState([]);
    const {socket} = useContext( SocketContext);
    

    useEffect(() => {
        socket.on('current-bands', (bands) =>{
            console.log(bands);
            setBands(bands);
        })

        return () => socket.off('current-bands');
    }, [ socket ])
   
    const cambioNombre = (event, id ) => {
        const nuevoNombre = event.target.value;

        setBands( bands => bands.map( band =>{
            if (band.id === id) {
                band.name = nuevoNombre;
            }
            return band
        }));


    }

    const onPerdioFoco = (id, nombre) => {
        // console.log(id, nombre);
        socket.emit( 'cambiar-nombre-banda', {id, nombre} );
    }

    const votar = ( id ) => {
        socket.emit( 'votar-banda', id );
      }

    const borrar = ( id ) => {
        socket.emit( 'borrar-banda', id );
     }



    const crearRows = () => {
        return (
          bands.map( band => { 
              return(
            <tr key={band.id} >
            <td>
                <button 
                className="btn btn-primary"
                onClick={() => votar( band.id ) }
                > +1</button>

            </td>
            <td>
                <input
                className="form-control"
                value={band.name}
                onChange={ (event) => cambioNombre( event, band.id)}
                onBlur={ () => onPerdioFoco( band.id, band.name)}
                />
            </td>
            <td> <h3> { band.votes }</h3></td>
            <td>
                <button 
                className="btn btn-danger"
                onClick={ () => borrar(band.id)}
                
                >
                    Borrar
                </button>
            </td>
            </tr>)

          })
                       
            

        );
    }

    

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Valoracion</th>
                        <th>Borrar</th>
                                                   
                        
                    </tr>
                </thead>
                <tbody>
                    {crearRows()}

                </tbody>
            </table>
            
        </>
    )
}
