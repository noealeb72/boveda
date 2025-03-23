import React from "react";

const Grilla = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p style={styles.noData}>
        No se encontraron documentos para esta búsqueda.
      </p>
    );
  }

  // 👉 Función para extraer el nombre del archivo desde la URL y eliminar ".pdf"
  const extraerTituloDesdeUrl = (url) => {
    if (!url) return "Sin título";
    const partes = url.split("/"); // Divide la URL por "/"
    const nombreArchivo = partes[partes.length - 1];
    return nombreArchivo.replace(".pdf", ""); // ✅ Eliminar ".pdf" al mostrar
  };

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Título</th>
          <th style={styles.th}>Fecha</th>
          <th style={styles.th}>Descripción</th>
          <th style={{ ...styles.th, width: "180px", textAlign: "center" }}>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((doc, index) => (
          <tr key={index}>
            {/* ✅ Extraer título desde la URL (sin ".pdf") */}
            <td style={styles.td}>{extraerTituloDesdeUrl(doc.url)}</td>

            {/* ✅ Mostrar fecha desde metadata */}
            <td style={styles.td}>{doc.metadata?.fecha || "Sin fecha"}</td>

            {/* ✅ Mostrar descripción desde metadata */}
            <td style={styles.td}>
              {doc.metadata?.descripcion || "Sin descripción"}
            </td>

            {/* ✅ Mostrar botones para ver y descargar */}
            <td style={styles.actions}>
              {/* 👁️ Acción para visualizar (abrir en nueva pestaña) */}
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkButton}
              >
                👁️ Ver
              </a>

              {/* ⬇️ Acción para descargar con extensión ".pdf" */}
              <a
                href={doc.url}
                download={extraerTituloDesdeUrl(doc.url) + ".pdf"}
                style={styles.linkButton}
              >
                ⬇️ Descargar
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ccc", // ✅ Bordes visibles
  },
  th: {
    backgroundColor: "#00468B",
    color: "#fff",
    padding: "12px",
    textAlign: "left",
    border: "1px solid #ccc", // ✅ Bordes visibles
    fontWeight: "bold",
  },
  td: {
    padding: "12px",
    border: "1px solid #ccc", // ✅ Bordes visibles
    verticalAlign: "middle", // ✅ Centrar verticalmente el texto
  },
  linkButton: {
    backgroundColor: "#00468B",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    border: "1px solid #00468B",
  },
  actions: {
    display: "flex",
    gap: "5px", // ✅ Espacio entre los botones
    justifyContent: "center", // ✅ Centrar horizontalmente
    alignItems: "center", // ✅ Centrar verticalmente
    padding: "10px",
  },
  noData: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
    padding: "20px",
  },
};

export default Grilla;
