import { useState } from "react";

const FormularioAlumno = ({ agregarAlumno }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [sexo, setSexo] = useState("");
  const [hablaIngles, sethablaIngles] = useState("");


    const handleChangeSexo = (e) => {
        setSexo(e.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !curso || !sexo || !hablaIngles) return;
    agregarAlumno({ 
        nombre_alumno: nombre,
        email_alumno: email,
        curso_alumno: curso,
        sexo_alumno: sexo,
        habla_ingles: hablaIngles
    });
    
    setNombre("");
    setEmail("");
    setCurso("");
    setSexo("");
    sethablaIngles("");
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <input
                type="text"
                placeholder="Nombre"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
        </div>
        
        <div className="mb-3">
            <label className="form-label">Email del alumno</label>
            <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
        </div>
        <div className="mb-3">
            <label className="form-label">Curso del alumno</label>
            <select
                className="form-select"
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required>
                <option value="">Seleccione un curso</option>
                <option value="ReactJS">ReactJS</option>
                <option value="Python">Python</option>
                <option value="NodeJS">NodeJS</option> 
            </select>
        </div>
        <div className="mb-3">
            <label className="form-label">Sexo del alumno</label>
            <div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sexoOptions"
                        id="sexoMasculino"
                        value="Masculino"
                        checked={sexo === "Masculino"}
                        onChange={handleChangeSexo}
                    />
                    <label className="form-check-label" htmlFor="sexoMasculino">Masculino</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sexoOptions"
                        id="sexoFemenino"
                        value="Femenino"
                        checked={sexo === "Femenino"}
                        onChange={handleChangeSexo}
                    />
                    <label className="form-check-label" htmlFor="sexoFemenino">Femenino</label>
                </div>
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sexoOptions"
                        id="sexoOtro"
                        value="Otro"
                        checked={sexo === "Otro"}
                        onChange={handleChangeSexo}
                    />
                    <label className="form-check-label" htmlFor="sexoOtro">Otro</label>
                </div>
            </div>
        </div>
        <div className="mb-3 form-check">
            <input
                type="checkbox"
                className="form-check-input"
                id="hablaInglesCheck"
                checked={hablaIngles === "Si"}
                onChange={(e) => sethablaIngles(e.target.checked ? "Si" : "No")}
            />
            <label className="form-check-label" htmlFor="hablaInglesCheck">¿Habla inglés?</label>
        </div>
        <button type="submit" className="btn btn-primary">Agregar Alumno</button>
    </form>
  );
}

export default FormularioAlumno;