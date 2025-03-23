import React from "react";
import { AiOutlineHome, AiOutlineFolder, AiOutlineFile, AiOutlineTag } from "react-icons/ai";

const Breadcrumb = ({ unidad, departamento, tipo }) => {
  return (
    <div style={styles.container}>
      {/* Icono de Inicio */}
      <AiOutlineHome style={styles.icon} />
      <span style={styles.link}>Inicio</span>

      {/* Icono de Facultad */}
      {unidad && (
        <>
          <span style={styles.separator}>{">"}</span>
          <AiOutlineFolder style={styles.icon} />
          <span style={styles.link}>{unidad.nombre}</span>
        </>
      )}

      {/* Icono de Departamento */}
      {departamento && (
        <>
          <span style={styles.separator}>{">"}</span>
          <AiOutlineFile style={styles.icon} />
          <span style={styles.link}>{departamento.nombre}</span>
        </>
      )}

      {/* Icono de Tipo de Documento */}
      {tipo && (
        <>
          <span style={styles.separator}>{">"}</span>
          <AiOutlineTag style={styles.icon} />
          <span style={styles.link}>{tipo}</span>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "16px",
    color: "#00468B",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "4px",
    fontSize: "18px",
    color: "#00468B",
  },
  link: {
    color: "#00468B",
    cursor: "default",
    fontWeight: "bold",
  },
  separator: {
    margin: "0 8px",
    color: "#777",
  },
};

export default Breadcrumb;
