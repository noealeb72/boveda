import React, { useState } from "react";
import { AiOutlineFolder, AiOutlineFile, AiOutlineTag } from "react-icons/ai";

const Navegacion = ({ usuario, onUnidadSeleccionada, onDepartamentoSeleccionado, onTipoSeleccionado }) => {
  const [vistaActual, setVistaActual] = useState("unidades");
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);

  if (!usuario) return null;

  const handleUnidadClick = (unidad) => {
    setUnidadSeleccionada(unidad);
    setDepartamentoSeleccionado(null);
    setVistaActual("departamentos");
    onUnidadSeleccionada(unidad);
  };
  
  const handleDepartamentoClick = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setVistaActual("tipos");
    onDepartamentoSeleccionado(departamento);
  };

  const handleTipoClick = (tipo) => {
    onTipoSeleccionado(tipo);
  };

  return (
    <aside style={styles.container}>
      <h3 style={styles.title}>Árbol Documental</h3>

      {/* 🔹 Mostrar Unidades Académicas */}
      {vistaActual === "unidades" && (
        <ul style={styles.list}>
          {usuario.unidades.map((unidad) => (
            <li key={unidad.nombre} style={styles.listItem}>
              <button style={styles.button} onClick={() => handleUnidadClick(unidad)}>
                <AiOutlineFolder style={styles.icon} />
                {unidad.nombre}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Mostrar Departamentos dentro de la Unidad Académica */}
      {vistaActual === "departamentos" && unidadSeleccionada && (
        <>
          <button style={styles.backButton} onClick={() => setVistaActual("unidades")}>
            Volver a Unidades Académicas
          </button>
          <ul style={styles.list}>
            {unidadSeleccionada.departamentos.map((departamento) => (
              <li key={departamento.nombre} style={styles.listItem}>
                <button style={styles.button} onClick={() => handleDepartamentoClick(departamento)}>
                  <AiOutlineFile style={styles.icon} />
                  {departamento.nombre}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      

      {/* 🔹 Mostrar Tipos dentro del Departamento */}
      {vistaActual === "tipos" && departamentoSeleccionado && (
        <>
          <button style={styles.backButton} onClick={() => setVistaActual("departamentos")}>
            Volver a Departamentos
          </button>
          <ul style={styles.list}>
            {departamentoSeleccionado.tipos.map((tipo) => (
              <li key={tipo} style={styles.listItem}>
                <button style={styles.button} onClick={() => handleTipoClick(tipo)}>
                  <AiOutlineTag style={styles.icon} />
                  {tipo}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

const styles = {
  container: {
    width: "250px",
    borderRight: "1px solid #ddd",
    padding: "20px",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#00468B",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "5px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    padding: "8px",
    width: "100%",
    color: "#00468B",
    fontSize: "16px",
    borderRadius: "4px",
  },
  backButton: {
    display: "block",
    marginBottom: "10px",
    background: "#E0E0E0",
    border: "none",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    color: "#00468B",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
    minWidth: "18px", // fuerza ancho uniforme
    minHeight: "18px", // fuerza alto uniforme
    display: "inline-block",
    verticalAlign: "middle", // asegura alineación con el texto
  }
  
};

export default Navegacion;
