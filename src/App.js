import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Create from './pages/Create';
import Show from './pages/Show';
import Update from './pages/Update';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/show' element={<Show />} />
        <Route path='/show/:id' element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
