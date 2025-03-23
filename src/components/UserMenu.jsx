import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      <button
        onClick={toggleMenu}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#D3D3D3", // Gris claro
        }}
      >
        <AiOutlineUser size={30} />
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "0",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          <button
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
            onClick={() => {
              // Acción para mostrar los datos personales (puedes agregar lógica aquí)
              alert("Datos personales");
            }}
          >
            Datos personales
          </button>
          <button
            onClick={() => {
              // Llamar a la función de logout pasada como prop
              onLogout();
              setIsOpen(false); // Cierra el menú
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              background: "none",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              color: "#D32F2F", // Color rojo para destacar
            }}
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
