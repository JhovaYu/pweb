import { useState } from 'react'
import FormularioAlumno from './components/FormularioAlumno.jsx'  
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


export default function App() {
  const [alumnos, setAlumnos] = useState([]);

  const agregarAlumno = (alumno) => {
    setAlumnos((prev) => [...prev, alumno]);
    console.log("Alumno agregado:", alumno);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Registro de alumnos</h1>
      <FormularioAlumno agregarAlumno={agregarAlumno} />

      <hr />
      <h2 className="h5">Alumnos (preview)</h2>
      <pre>{JSON.stringify(alumnos, null, 2)}</pre>
    </div>
  );
}
