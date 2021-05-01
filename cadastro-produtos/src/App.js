import Navbar from "./componentes/navbar";
import Rotas from "./Rotas"

import {HashRouter} from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
      <div className="container">
      <Navbar/>
      <Rotas/>
      </div>
      </HashRouter>
    </>
  );
}

export default App;
