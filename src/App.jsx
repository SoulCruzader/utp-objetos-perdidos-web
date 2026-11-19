import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import BuscarObjetos from './pages/BuscarObjetos.jsx'
import ReportarObjeto from './pages/ReportarObjeto.jsx'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/objetos" element={<BuscarObjetos />} />
        <Route path="/reportar" element={<ReportarObjeto />} />
      </Route>
    </Routes>
  )
}
