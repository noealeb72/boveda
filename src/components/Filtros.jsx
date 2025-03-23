import React, { useState } from "react";

const Filtros = ({ onFilter }) => {
  const [unidadAcademica, setUnidadAcademica] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [idDocumento, setIdDocumento] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ unidadAcademica, tipoDocumento, idDocumento });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Unidad Académica"
        value={unidadAcademica}
        onChange={(e) => setUnidadAcademica(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo Documento"
        value={tipoDocumento}
        onChange={(e) => setTipoDocumento(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID Documento"
        value={idDocumento}
        onChange={(e) => setIdDocumento(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Filtros;
