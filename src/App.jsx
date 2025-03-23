import React, { useState } from "react";
import Navegacion from "./components/Navegacion";
import Grilla from "./components/Grilla";
import Breadcrumb from "./components/Breadcrumb";
import Login from "./components/Login";
import UserMenu from "./components/UserMenu";
import ubaLogo from "./assets/uba-blanco.png";
import { AiOutlineFileProtect } from "react-icons/ai";
import { usuarios } from "./mockData";
import Buscador from "./components/Buscador";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [archivosFiltrados, setArchivosFiltrados] = useState([]);
  const [mostrarBuscador, setMostrarBuscador] = useState(true); // Estado para el acordeón de filtros

  const handleLogin = (usuario) => {
    setIsAuthenticated(true);
    setUsuarioActual(usuario);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsuarioActual(null);
    setUnidadSeleccionada(null);
    setDepartamentoSeleccionado(null);
    setTipoSeleccionado(null);
    setArchivosFiltrados([]);
  };

  const handleUnidadSeleccionada = (unidad) => {
    setUnidadSeleccionada(unidad);
    setDepartamentoSeleccionado(null);
    setTipoSeleccionado(null);
    setArchivosFiltrados([]);
  };

  const handleDepartamentoSeleccionado = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setTipoSeleccionado(null);
    setArchivosFiltrados([]);
  };

  const handleTipoSeleccionado = (tipo) => {
    if (!unidadSeleccionada || !departamentoSeleccionado) return;
    setTipoSeleccionado(tipo);
    setArchivosFiltrados([]); // Se limpia la tabla hasta que se haga una búsqueda
  };

  const handleBreadcrumbClick = (nivel) => {
    if (nivel === "inicio") {
      setUnidadSeleccionada(null);
      setDepartamentoSeleccionado(null);
      setTipoSeleccionado(null);
      setArchivosFiltrados([]);
    } else if (nivel === "unidad") {
      setDepartamentoSeleccionado(null);
      setTipoSeleccionado(null);
      setArchivosFiltrados([]);
    } else if (nivel === "departamento") {
      setTipoSeleccionado(null);
      setArchivosFiltrados([]);
    }
  };

  const handleRestablecerFiltros = () => {
    setArchivosFiltrados([]); // Limpia los resultados filtrados
  };

  /** Función para buscar documentos según los filtros y el tipo seleccionado */
  const handleBuscarDocumentos = (filtros) => {
    if (!tipoSeleccionado || !usuarioActual) return;
  
    const documentosFiltrados = usuarioActual.documentos.filter((doc) => {
      return (
        doc.unidadAcademica === unidadSeleccionada.nombre &&
        doc.departamento === departamentoSeleccionado.nombre &&
        doc.tipo === tipoSeleccionado &&
        Object.keys(filtros).every((campo) => {
          const valorFiltro = String(filtros[campo] || "").toLowerCase();
          const valorDocumento = String(doc.metadata[campo] || "").toLowerCase();
          return valorDocumento.includes(valorFiltro);
        })
      );
    });
  
    setArchivosFiltrados(documentosFiltrados);
  };
  
  

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#00468B",
          color: "#FFFFFF",
        }}
      >
        <img src={ubaLogo} alt="Logo UBA" style={{ height: "50px", width: "auto" }} />
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderRadius: "50%",
              height: "60px",
              width: "60px",
              marginBottom: "5px",
            }}
          >
            <AiOutlineFileProtect size={30} color="#00468B" />
          </div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>Bóveda Documental</h1>
        </div>
        <UserMenu onLogout={handleLogout} />
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        <Navegacion
          usuario={usuarioActual}
          onUnidadSeleccionada={handleUnidadSeleccionada}
          onDepartamentoSeleccionado={handleDepartamentoSeleccionado}
          onTipoSeleccionado={handleTipoSeleccionado}
        />
        <main style={{ flex: 1, padding: "20px" }}>
          <Breadcrumb
            unidad={unidadSeleccionada}
            departamento={departamentoSeleccionado}
            tipo={tipoSeleccionado}
            onBreadcrumbClick={handleBreadcrumbClick}
          />

          {/* Botón para mostrar u ocultar el buscador */}
          {tipoSeleccionado && (
            <>
             

              {mostrarBuscador && (
               <Buscador
               documentos={usuarioActual.documentos.filter(doc => doc.tipo === tipoSeleccionado)}
               onFiltrar={handleBuscarDocumentos}
               onRestablecer={handleRestablecerFiltros} 
             />
              )}
            </>
          )}

          {/* Mostrar la tabla solo cuando haya archivos filtrados */}
          {archivosFiltrados.length > 0 && <Grilla data={archivosFiltrados} />}
        </main>
      </div>
    </div>
  );
};

const styles = {
  toggleButton: {
    backgroundColor: "#00468B",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default App;
