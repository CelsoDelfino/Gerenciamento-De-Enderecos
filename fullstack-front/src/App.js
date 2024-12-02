import './App.css';
import Navbar from './layout/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AddUsuario from './usuario/AddUsuario';
import EditarUsuario from './usuario/EditarUsuario';
import DetalhesUsuario from './usuario/DetalhesUsuario';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adicionarUsuario" element={<AddUsuario />} />
          <Route path="/editarUsuario/:id" element={<EditarUsuario />} />
          <Route path="/detalhes/:id" element={<DetalhesUsuario />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
