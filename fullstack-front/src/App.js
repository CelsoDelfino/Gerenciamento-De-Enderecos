import './App.css';
import Navbar from './layout/Navbar';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AddUsuario from './usuario/AddUsuario';
import EditUsuario from './usuario/EditUsuario';
import ListaUsuario from './usuario/ListaUsuario';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adicionarUsuario" element={<AddUsuario />} />
          <Route path="/editarUsuario/:id" element={<EditUsuario />} />
          <Route path="/detalhes/:id" element={<ListaUsuario />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
