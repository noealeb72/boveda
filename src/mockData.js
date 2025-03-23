export const usuarios = [
  {
    username: "usuario1",
    password: "1234",
    unidades: [
      {
        nombre: "Facultad de Derecho",
        departamentos: [
          {
            nombre: "Departamento de alumnos",
            tipos: ["Legajo del alumno", "Título del alumno", "Analítico"]
          },
          {
            nombre: "Extensión universitaria",
            tipos: ["Informe", "Contrato"]
          }
        ]
      },
      {
        nombre: "Facultad de Ciencias Exactas",
        departamentos: [
          {
            nombre: "Matemática",
            tipos: ["Tesis", "Proyecto", "Artículo de investigación"]
          },
          {
            nombre: "Física",
            tipos: ["Informe", "Estudio", "Trabajo de campo"]
          },
          {
            nombre: "Química",
            tipos: ["Informe de laboratorio", "Investigación"]
          }
        ]
      },
      {
        nombre: "Facultad de Ingeniería",
        departamentos: [
          {
            nombre: "Electrónica",
            tipos: ["Tesis", "Proyecto", "Manual técnico"]
          },
          {
            nombre: "Sistemas",
            tipos: ["Desarrollo", "Análisis", "Sistemas Web"]
          },
          {
            nombre: "Mecánica",
            tipos: ["Informe técnico", "Diseño estructural"]
          }
        ]
      }
    ],

    documentos: [
      // ✅ Facultad de Derecho - Departamento de alumnos
      {
        unidadAcademica: "Facultad de Derecho",
        departamento: "Departamento de alumnos",
        tipo: "Legajo del alumno",
        url: "/archivos/derecho/LegajoAlumno1.pdf",
        metadata: {
          dni: "30688161",
          nombre: "Buigues Noelia",
          palabrasClave: ["legajo", "alumno"],
          descripcion: "Legajo completo del alumno.",
          fecha: "2025-02-02"
        }
      },
      {
        unidadAcademica: "Facultad de Derecho",
        departamento: "Departamento de alumnos",
        tipo: "Título del alumno",
        url: "/archivos/derecho/TituloAlumno.pdf",
        metadata: {
          DNI: "30745123",
          nombre: "Patricia Bravo",
          palabrasClave: ["título", "alumno"],
          descripcion: "Título del alumno.",
          fecha: "2025-03-15"
        }
      },
      {
        unidadAcademica: "Facultad de Derecho",
        departamento: "Departamento de alumnos",
        tipo: "Analítico",
        url: "/archivos/derecho/Analitico.pdf",
        metadata: {
          DNI: "14785625",
          nombre: "Marcela Bravo",
          palabrasClave: ["analítico", "informe"],
          descripcion: "Informe analítico del alumno.",
          fecha: "2025-03-15"
        }
      },

      // ✅ Facultad de Derecho - Extensión Universitaria
      {
        unidadAcademica: "Facultad de Derecho",
        departamento: "Extensión universitaria",
        tipo: "Informe",
        url: "/archivos/derecho/Informe1.pdf",
        metadata: {
          DNI: "30871234",
          nombre: "Lucía Fernández",
          palabrasClave: ["extensión", "informe", "universitaria"],
          descripcion: "Informe sobre extensión universitaria.",
          fecha: "2025-04-10"
        }
      },
      {
        unidadAcademica: "Facultad de Derecho",
        departamento: "Extensión universitaria",
        tipo: "Contrato",
        url: "/archivos/derecho/Contrato1.pdf",
        metadata: {
          DNI: "30981234",
          nombre: "Martín González",
          palabrasClave: ["contrato", "extensión"],
          descripcion: "Contrato firmado para colaboración externa.",
          fecha: "2025-05-05"
        }
      },

      // ✅ Facultad de Ciencias Exactas - Matemática
      {
        unidadAcademica: "Facultad de Ciencias Exactas",
        departamento: "Matemática",
        tipo: "Tesis",
        url: "/archivos/tesis/Tesis1.pdf",
        metadata: {
          DNI: "30523111",
          nombre: "José Pérez",
          palabrasClave: ["álgebra", "matemática", "ecuación"],
          descripcion: "Estudio sobre álgebra lineal avanzada.",
          fecha: "2025-07-20"
        }
      },
      {
        unidadAcademica: "Facultad de Ciencias Exactas",
        departamento: "Matemática",
        tipo: "Proyecto",
        url: "/archivos/tesis/Proyecto1.pdf",
        metadata: {
          DNI: "30685412",
          nombre: "Laura Gómez",
          palabrasClave: ["proyecto", "matemática"],
          descripcion: "Proyecto sobre geometría avanzada.",
          fecha: "2025-08-10"
        }
      },
      {
        unidadAcademica: "Facultad de Ciencias Exactas",
        departamento: "Matemática",
        tipo: "Artículo de investigación",
        url: "/archivos/tesis/ArticuloInvestigacion1.pdf",
        metadata: {
          DNI: "30799988",
          nombre: "Carlos Martínez",
          palabrasClave: ["investigación", "álgebra", "ecuación"],
          descripcion: "Análisis sobre métodos de resolución algebraica.",
          fecha: "2025-06-15"
        }
      },{
        unidadAcademica: "Facultad de Ciencias Exactas",
        departamento: "Física",
        tipo: "Estudio",
        url: "/archivos/ciencias/EstudioFisica.pdf",
        metadata: {
          DNI: "30987123",
          nombre: "Juan López",
          palabrasClave: ["estudio", "física", "análisis"],
          descripcion: "Estudio detallado sobre dinámica de fluidos.",
          fecha: "2025-09-10"
        }
    },
    {
        unidadAcademica: "Facultad de Ciencias Exactas",
        departamento: "Física",
        tipo: "Trabajo de campo",
        url: "/archivos/ciencias/TrabajoCampoFisica.pdf",
        metadata: {
          DNI: "30987124",
          nombre: "Carla Méndez",
          palabrasClave: ["campo", "física", "experimento"],
          descripcion: "Análisis experimental sobre campo magnético.",
          fecha: "2025-10-15"
        }
    },
    
    ]
  },

  // Usuario 2
  {
    username: "usuario2",
    password: "5678",
    unidades: [
      {
        nombre: "Facultad de Medicina",
        departamentos: [
          {
            nombre: "Anatomía",
            tipos: ["Investigación", "Estudio"]
          },
          {
            nombre: "Fisiología",
            tipos: ["Informe", "Evaluación", "Estudio clínico"]
          }
        ]
      },
      {
        nombre: "Facultad de Arquitectura",
        departamentos: [
          {
            nombre: "Urbanismo",
            tipos: ["Planificación urbana", "Estudio arquitectónico"]
          },
          {
            nombre: "Diseño de interiores",
            tipos: ["Propuesta de diseño", "Evaluación estructural"]
          }
        ]
      }
    ],
    documentos: [
      {
        unidadAcademica: "Facultad de Medicina",
        departamento: "Anatomía",
        tipo: "Investigación",
        url: "/archivos/medicina/Investigacion1.pdf",
        metadata: {
          DNI: "30745122",
          nombre: "Carlos Gómez",
          palabrasClave: ["anatomía", "medicina", "tejido"],
          descripcion: "Investigación sobre estructura celular.",
          fecha: "2025-06-18"
        }
      },
      {
        unidadAcademica: "Facultad de Medicina",
        departamento: "Fisiología",
        tipo: "Estudio clínico",
        url: "/archivos/medicina/Estudio1.pdf",
        metadata: {
          DNI: "30876512",
          nombre: "Ana Pérez",
          palabrasClave: ["fisiología", "células", "análisis"],
          descripcion: "Estudio clínico sobre estructura celular.",
          fecha: "2025-07-15"
        }
      }
    ]
  }
];
