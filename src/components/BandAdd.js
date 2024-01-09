import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext.js';
// import { useSocket } from '../hooks/useSocket.js';

export const BandAdd = () => {

    
    const[valor, setValor] = useState('');
    const {socket} = useContext(SocketContext) 

    const onSubmit= (ev) => {
        ev.preventDefault();
        console.log(valor);

        if ( valor.trim().length > 0 ){
            //TODO llamar la funcion para emitir el evento
            socket.emit( 'crear-banda', {nombre: valor} );
            setValor('');
        }

    }

    return (
        <>
            <h3> Agregar Nombres</h3>

            <form onSubmit={ onSubmit }>
                <input
                className="form-control"
                placeholder="Nuevo nombre"
                value={valor}
                onChange={(ev) => setValor(ev.target.value)}
                />
            </form>
            
        </>
    )
}
