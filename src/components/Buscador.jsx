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

  // ✅ Extrae todos los metadatos y palabras clave desde los documentos
  useEffect(() => {
    if (documentos.length > 0) {
      // Extrae todos los campos únicos
      const camposUnicos = [
        ...new Set(
          documentos.flatMap((doc) =>
            Object.keys(doc.metadata || {}).map((key) => key.toLowerCase())
          )
        ),
      ];

      // Extrae palabras clave únicas de los documentos
      const todasPalabrasClave = [
        ...new Set(
          documentos.flatMap((doc) =>
            doc.metadata?.palabrasClave ? doc.metadata.palabrasClave : []
          )
        ),
      ];

      setCampos(camposUnicos);
      setPalabrasClave(todasPalabrasClave);

      // Inicializa los filtros vacíos para cada campo
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

  // ✅ Maneja los cambios en los filtros
  const handleFiltroChange = (campo, valor) => {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // ✅ Formatea el nombre de la etiqueta
  const formatearEtiqueta = (campo) => {
    if (campo.toLowerCase() === "palabrasclave") return "Palabras clave"; // ✅ Mostrar con espacio y capitalización correcta
    if (campo.toLowerCase() === "nombre") return "Nombre";
    if (campo.toLowerCase() === "descripcion") return "Descripción";
    if (campo.toLowerCase() === "fecha") return "Fecha";
    if (campo.toLowerCase() === "dni") return "DNI";
  
    return campo
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // ✅ Verifica si hay filtros activos
  const hayFiltrosActivos = () => {
    return Object.values(filtros).some(
      (valor) => valor !== "" && valor !== null && valor !== undefined
    );
  };

  // ✅ Buscar registros
  const handleBuscar = () => {
    if (!hayFiltrosActivos()) {
      setMensaje("Se deben seleccionar filtros.");
      setResultados([]);
      return;
    }
  
    const resultadosFiltrados = documentos.filter((doc) =>
      Object.keys(filtros).every((campo) => {
        // 
        const valorFiltro = filtros[campo];
        const campoFormateado = campo.charAt(0) + campo.slice(1);
        const valorDocumento = doc.metadata?.[campoFormateado];
        //console.log(`este es el valor valorFiltro: ${valorFiltro}`);
        //console.log(`campoFormateado: ${campoFormateado}`);
        //console.log(`valorDocumento: ${valorDocumento}`);
        if (!valorFiltro) return true;
  
        // ✅ Si es una fecha, convertirla a formato yyyy-mm-dd para comparación
        if (campo === "fecha" || campo.toLowerCase() === "fecha" && valorFiltro) {
            const fechaFiltro = new Date(valorFiltro)
            .toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .split("/")
            .join("-");
        
          const fechaDocumento = valorDocumento
            ? valorDocumento.split("-").reverse().join("-")
            : "";
        
          console.log(`Fecha filtro: ${fechaFiltro}`);
          console.log(`Fecha documento: ${fechaDocumento}`);
        
          return fechaDocumento === fechaFiltro;
        }
  
        //
        if (campo === "palabrasclave") {
          return doc.metadata?.palabrasClave?.includes(valorFiltro);
        }
  
        // 
        if (typeof valorDocumento !== "undefined" && typeof valorFiltro !== "undefined") {
          return valorDocumento
            .toString()
            .toLowerCase()
            .includes(valorFiltro.toString().toLowerCase());
        }
  
        return false;
      })
    );
  
    if (resultadosFiltrados.length === 0) {
      setMensaje("No se encontraron documentos que coincidan con la búsqueda.");
      setResultados([]);
    } else {
      setMensaje("");
      setResultados(resultadosFiltrados);
    }
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


  // ✅ Maneja la descarga del archivo
  const handleDescargar = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Maneja la visualización del archivo
  const handleVer = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.filtroContainer}>
        {campos.map((campo) => (
  <div key={campo} style={styles.filterGroup}>
    <label style={styles.label}>{formatearEtiqueta(campo)}:</label>
    {campo === "palabrasclave" ? (
      <select
        style={styles.input}
        value={filtros[campo] || ""}
        onChange={(e) => handleFiltroChange(campo, e.target.value)}
      >
        <option value="">Seleccione...</option>
        {palabrasClave.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    ) : campo === "fecha" ? (
      <DatePicker
        selected={filtros[campo] ? new Date(filtros[campo]) : null} 
        onChange={(date) =>
          handleFiltroChange(
            campo,
            date ? date.toISOString().split("T")[0] : ""
          )
        }
        locale={es}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/aaaa"
        customInput={<input style={styles.input} />}
      />
    ) : (
      <input
      type="text"
      style={styles.input}
      value={filtros[campo] || ""}
      onChange={(e) => handleFiltroChange(campo, e.target.value)}
      />
    )}
  </div>
))}

        </div>

        {/* BOTONES */}
        <div style={styles.buttonContainer}>
        <button onClick={handleRestablecer} style={styles.clearButton}>
            <AiOutlineClose /> Limpiar Campos
          </button>
          <button onClick={handleBuscar} style={styles.searchButton}>
            <AiOutlineSearch /> Buscar
          </button>
          
        </div>
      </div>

      {/*  Mostrar mensaje fuera del contenedor */}
      {mensaje && <p style={styles.message}>{mensaje}</p>}

      {/*  Mostrar tabla fuera del contenedor */}
      {resultados.length > 0 && (
        <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Título</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((doc, index) => (
              <tr key={index} style={styles.trHover}>
                <td style={styles.td}>{doc.tipo}</td>
                <td style={styles.td}> {doc.metadata.fecha
    ? (() => {
        const [year, month, day] = doc.metadata.fecha.split('-');
        return `${day}-${month}-${year}`;
      })()
    : ""}
                </td>
                <td style={styles.td}>{doc.metadata.descripcion}</td>
                <td style={styles.td}>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleVer(doc.url)}
                  >
                    <FaEye /> Ver
                  </button>
                  <button
                    style={styles.actionButton}
                    onClick={() => handleDescargar(doc.url)}
                  >
                    <FaDownload /> Descargar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      )}
    </>
  );
};



//
const styles = {
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  searchButton: {
    backgroundColor: "#00468B", // Azul fuerte
    color: "#fff",
    padding: "12px 30px", // Aumenta el padding para hacerlo más grande
    border: "none",
    borderRadius: "25px", // Bordes redondeados
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Espacio entre el icono y el texto
    transition: "background-color 0.2s",
  },
  searchButtonHover: {
    backgroundColor: "#003366", // Azul oscuro al pasar el mouse
  },
  clearButton: {
    backgroundColor: "#D32F2F", // Rojo fuerte
    color: "#fff",
    padding: "12px 30px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "background-color 0.2s",
  },
  clearButtonHover: {
    backgroundColor: "#B71C1C", // Rojo oscuro al pasar el mouse
  },
  message: {
    color: "red",
    fontSize: "18px",
    marginTop: "20px",
    fontWeight: "bold",
    textAlign: "center", // ✅ Centrar el texto horizontalmente
    display: "flex",
    justifyContent: "center", // ✅ Centrar en el eje horizontal
    alignItems: "center", // ✅ Centrar en el eje vertical
    height: "50px", // ✅ Ajustar el tamaño del mensaje para que quede alineado verticalmente
  },
  tableContainer: {
    marginTop: "20px",
    overflowX: "auto", // ✅ Permitir el desplazamiento horizontal en pantallas pequeñas
  },
  table: {
    width: "100%", // ✅ Ocupa el ancho completo
    borderCollapse: "collapse",
    marginTop: "10px",
    backgroundColor: "#f9f9f9", // ✅ Color de fondo para una mejor visibilidad
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // ✅ Sombra ligera para un efecto elevado
  },
  th: {
    backgroundColor: "#00468B", // ✅ Azul UBA
    color: "#ffffff", // ✅ Letras en blanco para contraste
    padding: "12px",
    fontWeight: "bold",
    textAlign: "center", // ✅ Alinear el texto a la izquierda
    borderBottom: "2px solid #ddd", // ✅ Línea de separación
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd", // ✅ Línea de separación
    color: "#333", // ✅ Texto en color oscuro para mejor visibilidad
    fontSize: "14px",
    textAlign: "center", // ✅ Alinear el texto a la izquierda
    whiteSpace: "nowrap", // ✅ Evitar saltos de línea innecesarios
  },
  trHover: {
    backgroundColor: "#f1f1f1", // ✅ Color de fondo al pasar el mouse
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
    transition: "background-color 0.2s",
    marginRight: "5px",
  },
  actionButtonHover: {
    backgroundColor: "#003366", // ✅ Color más oscuro al pasar el mouse
  },
};

export default Buscador;
