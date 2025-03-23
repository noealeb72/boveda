import { documentos } from "./mockData";

export const fetchDocumentos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(documentos);
    }, 1000); // Simula un tiempo de espera
  });
};