import React, { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaEye, FaDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

const Buscador = ({ documentos }) => {
  const [filtros, setFiltros] = useState({});
  const [campos, setCampos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [resultados, setResultados] = useState([]);
  const [palabrasClave, setPalabrasClave] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    if (documentos.length > 0) {
      const camposUnicos = [
        ...new Set(
          documentos.flatMap((doc) =>
            Object.keys(doc.metadata || {}).map((key) => key.toLowerCase())
          )
        ),
      ];

      const todasPalabrasClave = [
        ...new Set(
          documentos.flatMap((doc) =>
            doc.metadata?.palabrasClave ? doc.metadata.palabrasClave : []
          )
        ),
      ];

      setCampos(camposUnicos);
      setPalabrasClave(todasPalabrasClave);

      setFiltros(
        camposUnicos.reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {})
      );
    } else {
      setCampos([]);
      setPalabrasClave([]);
    }
  }, [documentos]);

  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const formatearEtiqueta = (campo) => {
    if (campo.toLowerCase() === "palabrasclave") return "Palabras clave";
    if (campo.toLowerCase() === "nombre") return "Nombre";
    if (campo.toLowerCase() === "descripcion") return "Descripción";
    if (campo.toLowerCase() === "fecha") return "Fecha";
    if (campo.toLowerCase() === "dni") return "DNI";

    return campo
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const hayFiltrosActivos = () => {
    return Object.values(filtros).some(
      (valor) => valor !== "" && valor !== null && valor !== undefined
    );
  };

  const handleBuscar = () => {
    const texto = filtros.nombre?.toLowerCase().trim(); // usar como texto libre
  
    if (!texto) {
      setMensaje("Debe ingresar datos para la realizar una búsqueda.");
      setResultados([]);
      return;
    }
  
    const resultadosFiltrados = documentos.filter((doc) => {
      const meta = doc.metadata || {};
      const camposARevisar = [
        meta.nombre,
        meta.descripcion,
        meta.DNI || meta.dni,
        meta.legajo,
        doc.tipo,
      ];
  
      return camposARevisar.some((campo) =>
        campo?.toString().toLowerCase().includes(texto)
      );
    });
  
    if (resultadosFiltrados.length === 0) {
      setMensaje("No se encontraron documentos.");
    } else {
      setMensaje("");
    }
  
    setResultados(resultadosFiltrados);
  };
  
  
  
  
  

  const handleRestablecer = () => {
    setFiltros(
      campos.reduce((acc, key) => {
        acc[key] = key === "fecha" ? null : "";
        return acc;
      }, {})
    );
    setResultados([]);
    setMensaje("");
  };

  const handleDescargar = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVer = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      {/* ✅ Acordeón de filtros personalizado */}
      <div style={styles.acordeon}>
        <div style={styles.acordeonHeader} onClick={() => setMostrarFiltros(!mostrarFiltros)}>
          {mostrarFiltros ? "▾" : "▸"} <span style={{ color: "white" }}>Filtros</span>
        </div>
        {mostrarFiltros && (
          <div style={styles.acordeonBody}>
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>DNI:</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={filtros.dni || ""}
                    onChange={(e) => handleFiltroChange("dni", e.target.value)}
                  />
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.label}>Legajo:</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={filtros.legajo || ""}
                    onChange={(e) => handleFiltroChange("legajo", e.target.value)}
                  />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>Nombre:</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={filtros.nombre || ""}
                    onChange={(e) => handleFiltroChange("nombre", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={styles.buttonContainerRight}>
              <button onClick={handleBuscar} style={styles.searchButton}>
                <AiOutlineSearch /> Buscar
              </button>
              <button onClick={handleRestablecer} style={styles.clearButton}>
                <AiOutlineClose /> Restablecer
              </button>
            </div>
          </div>
        )}
      </div>
      {(mensaje || resultados.length > 0) && (
      <div style={styles.container}>
        {mensaje && <p style={styles.message}>{mensaje}</p>}

        {resultados.length > 0 && (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Tipo Documento</th>
                  <th style={styles.th}>Fecha</th>
                  <th style={styles.th}>Descripción</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((doc, index) => (
                  <tr key={index} style={styles.trHover}>
                    <td style={styles.td}>{doc.tipo}</td>
                    <td style={styles.td}>
                      {doc.metadata.fecha
                        ? (() => {
                            const [year, month, day] = doc.metadata.fecha.split("-");
                            return `${day}-${month}-${year}`;
                          })()
                        : ""}
                    </td>
                    <td style={styles.td}>{doc.metadata.descripcion}</td>
                    <td style={styles.td}>
                      <button style={styles.actionButton} onClick={() => handleVer(doc.url)}>
                        <FaEye /> Ver
                      </button>
                      <button style={styles.actionButton} onClick={() => handleDescargar(doc.url)}>
                        <FaDownload /> Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      )}
    </>
  );
};

// ✅ ESTILOS
const styles = {
  acordeon: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  acordeonHeader: {
    backgroundColor: "#00468B",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  acordeonBody: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderTop: "1px solid #ccc",
  },
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonContainerRight: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "10px",
  },
  searchButton: {
    backgroundColor: "#00468B",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  clearButton: {
    backgroundColor: "#D32F2F",
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  message: {
    color: "red",
    fontSize: "18px",
    marginTop: "20px",
    fontWeight: "bold",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },
  tableContainer: {
    marginTop: "20px",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#00468B",
    color: "#ffffff",
    padding: "12px",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    color: "#333",
    fontSize: "14px",
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  trHover: {
    backgroundColor: "#f1f1f1",
    transition: "background-color 0.2s",
  },
  actionButton: {
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
    backgroundColor: "#00468B",
    color: "#ffffff",
    fontSize: "14px",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    marginRight: "5px",
  },
};

export default Buscador;
