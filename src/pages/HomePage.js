import React, { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { BandAdd } from '../components/BandAdd';
import { BandList } from '../components/BandList';
// import { BandChart } from '../components/BancChart';



function HomePage() {

  const{online} = useContext (SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p> Service status:
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
          
          
        </p>

      </div>

      <h2>Listado de personas</h2>
      <hr />

      {/* <div className="row">
        <div className="col">
          <BandChart />

        </div>

      </div> */}

      
      <div className="row">
        <div className="col-8">
          <BandList />
          

          
      </div>
        
    </div>
{/* // finalizacion de parte superior

// Inicio parte inferior
  */}


<div className="col-4">
          <BandAdd />           
          </div>
    </div>

  

  );
}



export default HomePage;
