import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          © {new Date().getFullYear()} Bóveda Documental - Universidad de Buenos Aires
        </p>
        <p style={styles.text}>
          Desarrollado por <span style={styles.highlight}>Tu Equipo</span>
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#00468B",
    color: "#FFFFFF",
    padding: "10px 20px",
    textAlign: "center",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  text: {
    margin: "5px 0",
    fontSize: "14px",
  },
  highlight: {
    fontWeight: "bold",
    color: "#FFD700",
  },
};

export default Footer;
