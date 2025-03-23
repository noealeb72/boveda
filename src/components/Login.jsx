import React, { useState } from "react";
import { AiOutlineFileProtect } from "react-icons/ai"; // Ícono de la bóveda
import { usuarios } from "../mockData"; // Importar los usuarios del mock

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Buscar usuario en el mockData
    const user = usuarios.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      onLogin(user); // Enviar el usuario autenticado a la app
    } else {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.circle}>
            <AiOutlineFileProtect size={40} color="white" />
          </div>
          <p style={styles.title}>Bóveda Documental</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <a href="#" style={styles.link}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#F9F9F9",
  },
  card: {
    width: "350px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  circle: {
    width: "80px",
    height: "80px",
    backgroundColor: "#00468B",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#00468B",
    fontWeight: "bold",
    fontFamily: "'Times New Roman', serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #E5E5E5",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#00468B",
    color: "#FFFFFF",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
  },
  error: {
    color: "#D32F2F",
    fontSize: "14px",
    textAlign: "center",
  },
  link: {
    color: "#80C1E3",
    textAlign: "center",
    fontSize: "14px",
    textDecoration: "none",
  },
};

export default Login;
