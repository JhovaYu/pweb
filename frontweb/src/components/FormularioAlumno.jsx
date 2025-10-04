import { useState } from "react";

export default function FormularioAlumno() {
  // --- Estado del formulario (solo los 5 campos requeridos) ---
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  // --- Lista que alimenta la tabla de la derecha ---
  const [alumnos, setAlumnos] = useState([]);

  // Índice del registro que estamos editando. Null = no edición
  const [editIndex, setEditIndex] = useState(null);
  const isEditing = editIndex !== null;

  const limpiar = () => {
    setDocumento("");
    setNombre("");
    setSexo("");
    setTelefono("");
    setCorreo("");
  };

  const salirDeEdicion = () => setEditIndex(null);

  const onRegistrar = (e) => {
    e.preventDefault();
    if (!documento || !nombre || !sexo || !telefono || !correo) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevo = { documento, nombre, sexo, telefono, correo };

    if (isEditing) {
      // Reemplaza el alumno en la posición editIndex
      setAlumnos((prev) =>
        prev.map((al, i) => (i === editIndex ? { ...al, ...nuevo } : al))
      );
      salirDeEdicion();
    } else {
      // Inserta nuevo
      setAlumnos((prev) => [...prev, nuevo]);
    }

    limpiar();
  };

  const onCancelar = () => {
    limpiar();
    salirDeEdicion();
  };

  const onEditar = (idx) => {
    const a = alumnos[idx];
    setDocumento(a.documento);
    setNombre(a.nombre);
    setSexo(a.sexo);
    setTelefono(a.telefono);
    setCorreo(a.correo);
    setEditIndex(idx); // <-- activa modo edición
  };

  const onEliminar = (idx) => {
    setAlumnos((prev) => prev.filter((_, i) => i !== idx));
    // Si eliminas el que estabas editando, sal de edición
    if (editIndex === idx) salirDeEdicion();
  };

  return (
    <div className="wrap">
      {/* IZQUIERDA: FORMULARIO */}
      <section className="card form">
        <h3>Formulario</h3>
        <form onSubmit={onRegistrar} className="grid">
          <label>
            <span>Documento:</span>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="123456789"
            />
          </label>

          <label>
            <span>Nombre:</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Luis"
            />
          </label>

          {/* --- SEXO (radios) --- */}
          <div className="row">
            <span>Sexo:</span>
            <div className="radios">
              <label className="radio">
                <input
                  type="radio"
                  name="sexo"
                  value="Hombre"
                  checked={sexo === "Hombre"}
                  onChange={(e) => setSexo(e.target.value)}
                />
                Hombre
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="sexo"
                  value="Mujer"
                  checked={sexo === "Mujer"}
                  onChange={(e) => setSexo(e.target.value)}
                />
                Mujer
              </label>
            </div>
          </div>

          <label>
            <span>Teléfono:</span>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="9611111111"
            />
          </label>

          <label>
            <span>Correo:</span>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="luis@example.com"
            />
          </label>

          <div className="actions">
            <button type="submit" className="btn btn-registrar">
              {isEditing ? "Actualizar" : "Registrar"}
            </button>
            <button type="button" className="btn btn-cancelar" onClick={onCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </section>

      {/* DERECHA: TABLA */}
      <section className="card table">
        <h3>Lista de estudiantes</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Documento</th>
                <th>Nombre</th>
                <th>Sexo</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th style={{ width: 150 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty">
                    No hay estudiantes registrados.
                  </td>
                </tr>
              ) : (
                alumnos.map((a, idx) => (
                  <tr key={`${a.documento}-${idx}`}>
                    <td>{a.documento}</td>
                    <td>{a.nombre}</td>
                    <td>{a.sexo}</td>
                    <td>{a.correo}</td>
                    <td>{a.telefono}</td>
                    <td className="acciones">
                      <button className="btn btn-editar" onClick={() => onEditar(idx)}>
                        Editar
                      </button>
                      <button className="btn btn-eliminar" onClick={() => onEliminar(idx)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* estilos */}
      <style>{`
        .wrap{
          display:grid;
          grid-template-columns: 1fr 2fr;
          gap: 20px;
          padding: 24px;
        }
        .card{
          background:#fff;
          border:1px solid #e5e7eb;
          border-radius:10px;
          padding:18px;
          box-shadow:0 1px 2px rgba(195, 42, 42, 0.04);
        }
        .form{
          padding-left: 28px;
          padding-right: 22px;
        }
        h3{ margin:0 0 12px; font-weight:600; }
        .grid{ display:flex; flex-direction:column; gap:14px; }
        label{
          display:grid;
          grid-template-columns: 120px 1fr;
          align-items:center;
          gap:14px;
        }
        .row{
          display:grid;
          grid-template-columns: 120px 1fr;
          align-items:center;
          gap:14px;
        }
        .radios{ display:flex; gap:22px; }
        .radio{ display:flex; align-items:center; gap:8px; }
        input[type="text"], input[type="tel"], input[type="email"]{
          width:100%; border:1px solid #d1d5db; border-radius:6px; padding:8px 10px; outline:none;
          background:#2d2f33; color:#e5e7eb;
        }
        input[type="radio"]{ transform: translateY(1px); }

        .actions{ display:flex; gap:12px; margin-top:8px; }
        .btn{ border:none; border-radius:6px; padding:10px 14px; cursor:pointer; font-weight:600; }
        .btn-registrar{ background:#2f6b2f; color:#fff; }
        .btn-cancelar{ background:#5ec2c9; color:#0b2a2c; }
        .btn-editar{ background:#52b2d9; color:#0c2a36; margin-right:8px; }
        .btn-eliminar{ background:#e05353; color:#fff; }

        .table-wrap{ overflow:auto; }
        table{ width:100%; border-collapse:collapse; }
        thead th{ text-align:left; padding:10px 8px; border-bottom:1px solid #e5e7eb; }
        tbody td{ padding:10px 8px; border-bottom:1px solid #f1f5f9; vertical-align:middle; }
        .empty{ text-align:center; color:#6b7280; }
        .acciones{ white-space:nowrap; }

        @media (max-width: 900px){
          .wrap{ grid-template-columns: 1fr; }
          label,.row{ grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
