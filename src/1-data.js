/* =====================================================================
   DATA: edit this part to add or change content.
   Every text has an English (en) and Spanish (es) version.
   ===================================================================== */
const THEMES = {
  ml:       { en: "Physics & ML",          es: "Física y ML",            color: "#7cb2ff" },
  data:     { en: "Data",                  es: "Datos",                  color: "#ff7aa8" },
  software: { en: "Software",              es: "Software",               color: "#ffd166" },
  systems:  { en: "Systems & algorithms",  es: "Sistemas y algoritmos",  color: "#62e3b5" },
  games:    { en: "Games",                 es: "Juegos",                 color: "#ff9f5a" },
  design:   { en: "UX & design",           es: "UX y diseño",            color: "#c6b3ff" }
};
const PLACES = { uees: "UEES · Ecuador", uniovi: "Uniovi · Spain" };
const PEOPLE = {
  paula:  ["Paula Martillo", "https://github.com/bypaupau"],
  xavier: ["Xavier Cárdenas", "https://github.com/Xavier2806"],
  raul:   ["Raúl Garay", "https://github.com/raulgaray26"],
  jose:   ["José Viteri", "https://github.com/jvit04"],
  leonor: ["Leonor Molina", "https://github.com/Leomz21"]
};
const GH = "https://github.com/";
const COLAB = "https://colab.research.google.com/github/";

/* img: picture in assets/projects · plot: white chart (shown whole) · anim: animated preview drawn in code */
const PROJECTS = [
  { id: "higgs", theme: "ml", place: "uniovi", year: 2026, feat: true, file: "higgs_ttH.ipynb", anim: "higgs", img: "assets/projects/pa03.webp", plot: true,
    title: { en: "Hunting the Higgs boson (ttH) with PyTorch", es: "Buscando el bosón de Higgs (ttH) con PyTorch" },
    short: { en: "Neural networks that separate Higgs-boson signal from background in collision data, then predict the Higgs pT.", es: "Redes neuronales que separan la señal del bosón de Higgs del fondo en datos de colisiones y predicen el pT del Higgs." },
    desc: { en: "My extended, corrected and fully commented edition of practical PA_03 from the Data Analysis in Modern Physics course (ADFM), created by Prof. Pietro Vischia. It reads ROOT files, trains PyTorch classifiers to find ttH events among their backgrounds, and builds a regression for the Higgs transverse momentum.",
            es: "Mi edición extendida, corregida y comentada de la práctica PA_03 de Análisis de Datos en Física Moderna (ADFM), creada por el profesor Pietro Vischia. Lee archivos ROOT, entrena clasificadores en PyTorch para encontrar eventos ttH entre sus fondos y construye una regresión del momento transverso del Higgs." },
    did: { en: ["Binary and multiclass classification of signal vs. each background process", "Class weighting to handle imbalance: AUC from 86.27% to 87.24%", "Regression of the Higgs pT with extra experiments to improve it", "A section linking the notebook to real analyses at CERN"],
           es: ["Clasificación binaria y multiclase de la señal frente a cada proceso de fondo", "Pesos por clase para el desbalance: el AUC pasa de 86,27 % a 87,24 %", "Regresión del pT del Higgs con experimentos propios para mejorarla", "Una sección que conecta el cuaderno con los análisis reales del CERN"] },
    tech: ["Python", "PyTorch", "pandas", "scikit-learn", "uproot (ROOT)", "Matplotlib"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM---PA_03_neural_network_torch.ipynb" }, { t: "colab", u: COLAB + "DanielV-13/ADFM---PA_03_neural_network_torch.ipynb/blob/main/ADFM_PA_03_neural_network_torch.ipynb" }] },

  { id: "wids", theme: "data", place: "uees", year: 2026, feat: true, file: "wids_datathon_2026", anim: "data",
    award: { en: "3rd place", es: "3.er lugar" },
    title: { en: "WiDS Datathon 2026 · Team Artemis", es: "Datathon WiDS 2026 · Equipo Artemis" },
    short: { en: "Third place at the Women in Data Science Datathon hosted by ESPOL, Ecuador.", es: "Tercer lugar en el Datathon Women in Data Science organizado por la ESPOL, Ecuador." },
    desc: { en: "A data-science competition organised at ESPOL where our team, Artemis, reached the podium in July 2026.",
            es: "Una competencia de ciencia de datos organizada en la ESPOL en la que nuestro equipo, Artemis, llegó al podio en julio de 2026." },
    did: { en: ["DRAFT · Daniel: the problem we solved", "DRAFT · Daniel: my role in the team", "DRAFT · Daniel: model and metric that got us 3rd"],
           es: ["BORRADOR · Daniel: el problema que resolvimos", "BORRADOR · Daniel: mi rol en el equipo", "BORRADOR · Daniel: el modelo y la métrica que nos dieron el 3.er lugar"] },
    tech: ["Python", "pandas", "scikit-learn"], links: [], teamRepoNote: true },

  { id: "param", theme: "ml", place: "uniovi", year: 2026, file: "parameterized_nn.ipynb", anim: "param", img: "assets/projects/pl02.webp", plot: true,
    title: { en: "Parameterized neural networks for an X → tt̄ search", es: "Redes neuronales paramétricas para buscar X → tt̄" },
    short: { en: "One network that takes the particle's mass as an input and still works on masses it never saw.", es: "Una sola red que recibe la masa de la partícula como entrada y funciona incluso con masas que nunca vio." },
    desc: { en: "Practical PL_02 of ADFM, based on Baldi et al. (arXiv:1601.07913). In a search for a new resonance of unknown mass, can a single parameterized network replace one specialised network per mass hypothesis, and interpolate to a mass that was left out of training?",
            es: "Práctica PL_02 de ADFM, basada en Baldi et al. (arXiv:1601.07913). En la búsqueda de una resonancia nueva de masa desconocida, ¿puede una sola red paramétrica sustituir a una red especializada por cada hipótesis de masa e interpolar a una masa excluida del entrenamiento?" },
    did: { en: ["Fixed-mass networks vs. one parameterized network, compared by AUC vs. mass", "Interpolation test with the 750 GeV sample excluded from training", "Robustness across random seeds and correlation studies of the features"],
           es: ["Redes de masa fija frente a una red paramétrica, comparadas por AUC según la masa", "Prueba de interpolación excluyendo la muestra de 750 GeV del entrenamiento", "Robustez frente a semillas aleatorias y estudio de correlaciones de las variables"] },
    tech: ["Python", "PyTorch", "scikit-learn", "pandas", "seaborn"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM---PL_02_inductive_bias_parameterized_nns.ipynb" }] },

  { id: "semf", theme: "ml", place: "uniovi", year: 2026, file: "liquid_drop_SEMF.ipynb", anim: "semf",
    title: { en: "Liquid drop model: fitting the nuclear binding energy", es: "Modelo de la gota líquida: ajuste de la energía de enlace nuclear" },
    short: { en: "Least-squares fit of the semi-empirical mass formula to real nuclear data.", es: "Ajuste por mínimos cuadrados de la fórmula semiempírica de masas a datos nucleares reales." },
    desc: { en: "A computational practical for my Nuclear and Particle Physics course (FNPE). From the Nuclear Wallet Cards I compute the binding energy per nucleon of every nucleus, map the chart of nuclides with the neutron drip line, and fit the five SEMF coefficients globally and by mass region.",
            es: "Práctica computacional de Física Nuclear y de Partículas (FNPE). A partir de las Nuclear Wallet Cards calculo la energía de enlace por nucleón de cada núcleo, dibujo la carta de núclidos con la línea de goteo de neutrones y ajusto los cinco coeficientes de la SEMF de forma global y por regiones de masa." },
    did: { en: ["B/A for stable and unstable nuclei from measured mass excesses", "Chart of nuclides (Z vs N) with the neutron drip line Sₙ = 0", "Separate fits for A < 100 and A ≥ 100, compared with the reference values"],
           es: ["B/A de núcleos estables e inestables a partir del exceso de masa medido", "Carta de núclidos (Z vs N) con la línea de goteo de neutrones Sₙ = 0", "Ajustes separados para A < 100 y A ≥ 100, comparados con los valores de referencia"] },
    tech: ["Python", "NumPy", "SciPy", "pandas", "Matplotlib"],
    links: [{ t: "github", u: GH + "DanielV-13/FNPE---CALCULO-DE-PARAMETROS-de-MODELO-DE-LA-GOTA-LIQUIDA-SEMF-" }] },

  { id: "likelihood", theme: "ml", place: "uniovi", year: 2026, file: "profile_likelihood.ipynb", anim: "likelihood", img: "assets/projects/pl01.webp", plot: true,
    title: { en: "Profile likelihood fits", es: "Ajustes de verosimilitud perfilada" },
    short: { en: "How much signal is there, and how sure are we? A counting experiment done the particle-physics way.", es: "¿Cuánta señal hay y qué tan seguros estamos? Un experimento de conteo como en física de partículas." },
    desc: { en: "Practical PL_01 of ADFM. Signal plus background with a sideband measurement, a profiled likelihood, MINOS intervals and a coverage study with thousands of toy experiments.",
            es: "Práctica PL_01 de ADFM. Señal más fondo con una medida de banda lateral, verosimilitud perfilada, intervalos MINOS y un estudio de cobertura con miles de experimentos simulados." },
    did: { en: ["Profiled vs. frozen background nuisance parameter", "Coverage checks with 1,000 and 2,000 toy experiments", "Solved and commented every exercise"],
           es: ["Parámetro de ruido del fondo perfilado frente a congelado", "Cobertura comprobada con 1.000 y 2.000 experimentos simulados", "Todos los ejercicios resueltos y comentados"] },
    tech: ["Python", "iminuit (MINUIT)", "SciPy", "NumPy", "Matplotlib"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM---PL_01_profile_likelihood_RESUELTO_Daniel_Vaca.ipynb" }] },

  { id: "dnn", theme: "ml", place: "uniovi", year: 2026, file: "dnn_from_scratch.ipynb", anim: "dnn", img: "assets/projects/pa02.webp", plot: true,
    title: { en: "A neural network from scratch in NumPy", es: "Una red neuronal desde cero con NumPy" },
    short: { en: "Every piece written by hand: matrices, activations, loss, derivatives and the training loop.", es: "Cada pieza escrita a mano: matrices, activaciones, pérdida, derivadas y el bucle de entrenamiento." },
    desc: { en: "Practical PA_02 of ADFM: classify houses from San Francisco vs. New York without PyTorch or TensorFlow. The goal is not only to predict but to understand what happens inside the network.",
            es: "Práctica PA_02 de ADFM: clasificar casas de San Francisco frente a Nueva York sin PyTorch ni TensorFlow. El objetivo no es solo predecir, sino entender qué pasa dentro de la red." },
    did: { en: ["Architecture and shape diagrams for every layer", "Backpropagation implemented by hand", "My own experiments with learning rate and activations"],
           es: ["Diagramas de arquitectura y dimensiones de cada capa", "Backpropagation implementado a mano", "Experimentos propios con la tasa de aprendizaje y las activaciones"] },
    tech: ["Python", "NumPy", "pandas", "scikit-learn", "Matplotlib"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM---PA_02_neural_network_from_scratch" }] },

  { id: "autodiff", theme: "ml", place: "uniovi", year: 2026, file: "autodiff.ipynb", anim: "autodiff", img: "assets/projects/pa01.webp", plot: true,
    title: { en: "Autodiff: how a computer takes derivatives", es: "Autodiff: cómo deriva un ordenador" },
    short: { en: "Analytic, symbolic, numerical and automatic derivatives, plus autodiff built from dual numbers.", es: "Derivadas analíticas, simbólicas, numéricas y automáticas, y autodiff construido con números duales." },
    desc: { en: "Practical PA_01 of ADFM, the base of everything that follows: before training a network you have to understand how a computer computes derivatives, because that is exactly what backpropagation does.",
            es: "Práctica PA_01 de ADFM, la base de todo lo demás: antes de entrenar una red hay que entender cómo calcula derivadas un ordenador, porque eso es justo lo que hace el backpropagation." },
    did: { en: ["A DualNumber class with its own arithmetic and sine", "Numerical error vs. step size ε", "Comparison against PyTorch's reverse mode"],
           es: ["Una clase DualNumber con su propia aritmética y seno", "Error numérico según el paso ε", "Comparación con el modo inverso de PyTorch"] },
    tech: ["Python", "NumPy", "SymPy", "PyTorch", "Matplotlib"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM---PA_01_autodiff" }] },

  { id: "conv", theme: "ml", place: "uniovi", year: 2026, file: "dense_vs_conv.ipynb", anim: "conv",
    title: { en: "Dense vs. convolutional networks", es: "Redes densas frente a convolucionales" },
    short: { en: "Comparing fully connected and convolutional architectures on the same task.", es: "Comparación de arquitecturas totalmente conectadas y convolucionales en la misma tarea." },
    desc: { en: "Practical PL_03 of ADFM. DRAFT · Daniel: add the dataset, the result and what you concluded.",
            es: "Práctica PL_03 de ADFM. BORRADOR · Daniel: añade el conjunto de datos, el resultado y tu conclusión." },
    did: { en: ["DRAFT · Daniel: key result"], es: ["BORRADOR · Daniel: resultado clave"] },
    tech: ["Python", "PyTorch"],
    links: [{ t: "github", u: GH + "DanielV-13/ADFM----PL_03_dense_vs_convolutional.ipynb" }] },

  { id: "evac", theme: "systems", place: "uees", year: 2026, file: "evacuation_routes.py", img: "assets/projects/evac.webp",
    title: { en: "Earthquake evacuation routes for a shopping mall", es: "Rutas de evacuación ante sismos para un centro comercial" },
    short: { en: "Graph algorithms that find the safest way out, even when the main route is blocked.", es: "Algoritmos de grafos que encuentran la salida más segura, incluso si la ruta principal está bloqueada." },
    desc: { en: "The La Rotonda mall modelled as a weighted, undirected graph of 45 nodes and 59 edges (stores, corridors and doors). Built for security staff, it computes the optimal evacuation route from any point and alternatives when corridors are blocked, with an interactive map.",
            es: "El centro comercial La Rotonda modelado como un grafo ponderado no dirigido de 45 nodos y 59 aristas (locales, pasillos y puertas). Pensado para el personal de seguridad, calcula la ruta óptima de evacuación desde cualquier punto y alternativas cuando hay pasillos bloqueados, con un mapa interactivo." },
    did: { en: ["Dijkstra and Floyd–Warshall implementations", "Blocked-corridor scenarios and timing and memory benchmarks", "Interactive HTML map of the mall"],
           es: ["Implementación de Dijkstra y Floyd–Warshall", "Escenarios de pasillos bloqueados y pruebas de tiempo y memoria", "Mapa interactivo del centro comercial en HTML"] },
    tech: ["Python", "NetworkX", "Matplotlib", "JavaScript"], people: ["paula", "raul", "jose"],
    links: [{ t: "github", u: GH + "ueesaalg/aalg_act2_2p_ord1_26_grupo1" }] },

  { id: "k8s", theme: "systems", place: "uees", year: 2026, file: "k8s-tasks-platform", img: "assets/projects/k8s.webp",
    title: { en: "Distributed task platform on Kubernetes", es: "Plataforma de tareas distribuida en Kubernetes" },
    short: { en: "Two machines, two clusters, one app: the interface and the backend live on different computers.", es: "Dos máquinas, dos clústeres, una app: la interfaz y el backend viven en computadoras distintas." },
    desc: { en: "A collaborative project-management app deployed across two independent Kubernetes clusters connected by a private network. Configuration is injected, sessions are stateless and all state lives in one shared database, so any replica can answer any request.",
            es: "Una app colaborativa de gestión de proyectos desplegada en dos clústeres de Kubernetes independientes conectados por una red privada. La configuración se inyecta, las sesiones no guardan estado y todo vive en una base de datos compartida, así que cualquier réplica puede atender cualquier petición." },
    did: { en: ["Kubernetes manifests: deployments, services, secrets and config maps", "Node.js backend with MongoDB and a Vue front end", "Accounts with encrypted passwords for admins and workers"],
           es: ["Manifiestos de Kubernetes: deployments, services, secrets y configmaps", "Backend en Node.js con MongoDB y frontend en Vue", "Cuentas con contraseñas cifradas para administradores y trabajadores"] },
    tech: ["Kubernetes", "Docker", "Node.js", "MongoDB", "Vue"], people: ["paula"],
    links: [{ t: "github", u: GH + "bypaupau/Kubernetes-Proyecto-IIParcial-Distribuidos" }] },

  { id: "inventory", theme: "systems", place: "uees", year: 2026, file: "inventory-distributed", anim: "network",
    title: { en: "Distributed inventory system", es: "Sistema de inventario distribuido" },
    short: { en: "An inventory app on one machine, its database and reports on another, joined over Tailscale.", es: "Una app de inventario en una máquina y su base de datos y reportes en otra, unidas por Tailscale." },
    desc: { en: "My half of the system: a PostgreSQL database with persistent volumes and a reports service, connected through Docker's internal network, while my teammate's inventory app reaches the database from another computer.",
            es: "Mi mitad del sistema: una base de datos PostgreSQL con volúmenes persistentes y un servicio de reportes, conectados por la red interna de Docker, mientras la app de inventario de mi compañera llega a la base desde otra computadora." },
    did: { en: ["Docker Compose setup with an init script", "Reports service in Node.js and EJS", "Cross-machine connection over Tailscale"],
           es: ["Configuración con Docker Compose y script de inicialización", "Servicio de reportes en Node.js y EJS", "Conexión entre máquinas a través de Tailscale"] },
    tech: ["Docker", "PostgreSQL", "Node.js", "Express", "Tailscale"], people: ["paula"],
    links: [{ t: "github", u: GH + "bypaupau/proyectoSistemasDistribuidosP1" }] },

  { id: "sriconv", theme: "data", place: "uees", year: 2026, file: "sri_converter.py", anim: "pdf2xlsx", company: true,
    title: { en: "SRI tax-document converter", es: "Convertidor de documentos del SRI" },
    short: { en: "Turns Ecuadorian electronic-invoice PDFs into clean Excel tables.", es: "Convierte los PDF de comprobantes electrónicos ecuatorianos en tablas de Excel limpias." },
    desc: { en: "A Python tool that reads documents from Ecuador's tax authority (SRI) and exports structured data to Excel. It handles issued and received invoices, debit notes and credit notes, and was improved over several cycles without ever breaking what already worked.",
            es: "Una herramienta en Python que lee documentos del SRI y exporta los datos estructurados a Excel. Maneja facturas emitidas y recibidas, notas de débito y notas de crédito, y se mejoró en varios ciclos sin romper nunca lo que ya funcionaba." },
    did: { en: ["Multi-document parser for four SRI document types", "Excel export ready for accounting", "Iterative fixes guarded by a no-regression rule"],
           es: ["Parser para cuatro tipos de documentos del SRI", "Exportación a Excel lista para contabilidad", "Mejoras iterativas con la regla de no romper nada"] },
    tech: ["Python", "PDF parsing", "pandas", "Excel"], links: [] },

  { id: "todo", theme: "software", place: "uees", year: 2025, file: "ToDoApp.java", img: "assets/projects/todo.webp",
    title: { en: "To-Do list manager in Java", es: "Gestor de tareas en Java" },
    short: { en: "22 options, undo and redo with stacks, history and file persistence.", es: "22 opciones, deshacer y rehacer con pilas, historial y persistencia en archivo." },
    desc: { en: "A console application for the Data Structures course: several to-do lists, each with tasks that have priority and due date, plus search, filters, moves between lists and a history of completed work.",
            es: "Aplicación de consola para Estructura de Datos: varias listas, cada una con tareas con prioridad y fecha límite, además de búsqueda, filtros, mover tareas entre listas e historial de completadas." },
    did: { en: ["Undo/redo implemented with stacks", "Completed-task history by week, 15 days and month", "Data saved to a file between runs"],
           es: ["Deshacer y rehacer implementados con pilas", "Historial de completadas por semana, 15 días y mes", "Datos guardados en archivo entre ejecuciones"] },
    tech: ["Java", "Data structures"], people: ["xavier"],
    links: [{ t: "github", u: GH + "DanielV-13/PROYECTO-TO-DO-APP-CARDENAS-VACA" }] },

  { id: "xml", theme: "software", place: "uees", year: 2025, file: "ArbolXML.java", img: "assets/projects/parser.webp",
    title: { en: "XML parser with a multi-child tree", es: "Parser XML con árbol multihijos" },
    short: { en: "Reads, validates and rebuilds XML from scratch, without XML libraries.", es: "Lee, valida y reconstruye XML desde cero, sin librerías XML." },
    desc: { en: "A Java Swing application that builds a multi-child tree from any XML file, validates its structure and lets you traverse, search, sort and generate new XML files.",
            es: "Una aplicación en Java Swing que construye un árbol multihijos a partir de cualquier XML, valida su estructura y permite recorrerlo, buscar, ordenar y generar nuevos archivos XML." },
    did: { en: ["Parser and validation without external libraries", "Tree traversals and heap-based ordered search", "Swing GUI with load, search, sort and add-node panels"],
           es: ["Parser y validación sin librerías externas", "Recorridos del árbol y búsqueda ordenada con Heap", "Interfaz Swing con paneles de carga, búsqueda, orden y agregar nodo"] },
    tech: ["Java", "Swing", "Trees", "Heap"], people: ["xavier"],
    links: [{ t: "github", u: GH + "DanielV-13/ESTRUCTURA-DE-DATOS-PROYECTO-PARSER-XML" }] },

  { id: "adoption", theme: "software", place: "uees", year: 2025, file: "adoption_agency.sql", anim: "db",
    title: { en: "Child-adoption agency database", es: "Base de datos de una agencia de adopción" },
    short: { en: "From one messy spreadsheet to a normalized database with PDF reports.", es: "De una hoja de cálculo desordenada a una base normalizada con reportes en PDF." },
    desc: { en: "A Database I project: the data was normalized step by step from 0NF to 3NF, loaded into SQL and served through a JavaFX application that generates PDF reports.",
            es: "Proyecto de Base de Datos I: los datos se normalizaron paso a paso de 0FN a 3FN, se cargaron en SQL y se presentan en una aplicación JavaFX que genera reportes en PDF." },
    did: { en: ["Normalization 0NF → 1NF → 2NF → 3NF", "Reports on adoptions, process states and cancellation reasons", "JavaFX desktop interface"],
           es: ["Normalización 0FN → 1FN → 2FN → 3FN", "Reportes de adopciones, estados del proceso y motivos de cancelación", "Interfaz de escritorio en JavaFX"] },
    tech: ["SQL", "Java", "JavaFX", "PDF reports"], people: ["paula", "leonor"],
    links: [{ t: "github", u: GH + "DanielV-13/BASE-DE-DATOS-ADOPCION-NI-O" }] },

  { id: "android", theme: "software", place: "uees", year: 2026, file: "SurveyApp.apk", anim: "phone",
    title: { en: "Offline survey app for Android", es: "App de encuestas offline para Android" },
    short: { en: "Collect survey answers without internet and keep a local history.", es: "Recoge respuestas de encuestas sin internet y guarda un historial local." },
    desc: { en: "An Android app that stores every survey in a local SQLite database so it works in the field without connection, with a history screen to review past answers.",
            es: "Una app de Android que guarda cada encuesta en una base SQLite local para funcionar en campo sin conexión, con una pantalla de historial para revisar respuestas anteriores." },
    did: { en: ["SQLite contract and database helper", "Survey form and history activities"], es: ["Contrato y helper de base de datos SQLite", "Actividades de formulario e historial"] },
    tech: ["Android", "Java", "SQLite"],
    links: [{ t: "github", u: GH + "DanielV-13/Android-App-Encuestas-Offline" }] },

  { id: "rpg", theme: "software", place: "uees", year: 2026, file: "rpg_prolog_bot", img: "assets/projects/rpg.webp",
    title: { en: "RPG Prolog Bot", es: "RPG Prolog Bot" },
    short: { en: "A role-playing game where a chatbot turns your words into real Prolog queries.", es: "Un juego de rol en el que un chatbot convierte tus palabras en consultas Prolog reales." },
    desc: { en: "A Laravel web interface that queries a SWI-Prolog knowledge base of characters, enemies, missions and weapons, and narrates the result, styled like the classic SNES-era Dragon Quest games.",
            es: "Una interfaz web en Laravel que consulta una base de conocimiento en SWI-Prolog con personajes, enemigos, misiones y armas, y narra el resultado, con la estética de los Dragon Quest clásicos de SNES." },
    did: { en: ["Knowledge base and new rules in Prolog", "Chatbot that builds and runs Prolog queries", "Single and group combat with generated narration"],
           es: ["Base de conocimiento y reglas nuevas en Prolog", "Chatbot que construye y ejecuta consultas Prolog", "Combate individual y grupal con narración generada"] },
    tech: ["PHP", "Laravel", "SWI-Prolog", "CSS"],
    links: [{ t: "github", u: GH + "DanielV-13/Actividad_Recuperacion_Prolog_Laravel" }] },

  { id: "catventures", theme: "games", place: "uees", year: 2026, file: "Catventures.unity", img: "assets/projects/catventures.webp",
    title: { en: "Catventures", es: "Catventures" },
    short: { en: "A lost kitten, two chained mini-games and one way home.", es: "Un gatito perdido, dos minijuegos encadenados y un camino a casa." },
    desc: { en: "A 2D Unity game with shared lives and a difficulty chosen once. Paula built the menu, narration and top-down maze; I built the Catcher mini-game, the HUD and the ending screens.",
            es: "Un juego 2D en Unity con vidas compartidas y una dificultad que se elige una sola vez. Paula hizo el menú, la narración y el laberinto; yo hice el minijuego Catcher, el HUD y las pantallas de final." },
    did: { en: ["Catcher mini-game", "HUD with lives and score", "Win and game-over screens"], es: ["Minijuego Catcher", "HUD con vidas y puntaje", "Pantallas de victoria y derrota"] },
    tech: ["Unity", "C#"], people: ["paula"],
    links: [{ t: "github", u: GH + "bypaupau/Catventures-Game" }] },

  { id: "turtle", theme: "games", place: "uees", year: 2026, file: "TurtleNinja.unity", img: "assets/projects/turtle.webp", video: "assets/projects/turtle.mp4",
    title: { en: "Turtle Ninja: an endless platformer", es: "Turtle Ninja: un plataformas infinito" },
    short: { en: "Jump, throw rocks at saws, eat apples. The level never ends.", es: "Salta, lanza rocas a las sierras, come manzanas. El nivel nunca termina." },
    desc: { en: "A 2D platformer in Unity where the turtle runs on its own and platforms, saws and apples are generated as you go.",
            es: "Un juego de plataformas 2D en Unity donde la tortuga corre sola y las plataformas, sierras y manzanas se generan mientras avanzas." },
    did: { en: ["Procedural generation of platforms and obstacles", "Projectile mechanic to destroy saws", "Score and restart loop"], es: ["Generación procedural de plataformas y obstáculos", "Mecánica de proyectiles para destruir sierras", "Puntaje y reinicio"] },
    tech: ["Unity 6", "C#", "URP 2D"],
    links: [{ t: "github", u: GH + "DanielV-13/Proyecto_Unity_1" }] },

  { id: "kart", theme: "games", place: "uees", year: 2026, file: "KartRacing3D.unity", anim: "kart",
    title: { en: "3D kart racing", es: "Carreras de karts en 3D" },
    short: { en: "Unity's Karting Microgame, extended with my own power-up, obstacle and spawner.", es: "El Karting Microgame de Unity, ampliado con mi propio power-up, obstáculo y generador." },
    desc: { en: "My first 3D game: a faster custom kart, a speed boost with cooldown, an obstacle, an extended track and a manager that spawns power-ups or obstacles at random as you approach.",
            es: "Mi primer juego 3D: un kart personalizado más rápido, un impulso de velocidad con recarga, un obstáculo, un tramo de pista extendido y un administrador que genera power-ups u obstáculos al azar cuando te acercas." },
    did: { en: ["Proximity-based random spawner", "Custom boost with cooldown", "Extended track with checkpoints"], es: ["Generador aleatorio por proximidad", "Impulso propio con recarga", "Pista extendida con checkpoints"] },
    tech: ["Unity", "C#"],
    links: [{ t: "github", u: GH + "DanielV-13/proyecto3D" }] },

  { id: "srihci", theme: "design", place: "uees", year: 2026, file: "sri_redesign.fig", anim: "invoice",
    title: { en: "Redesigning Ecuador's e-invoicing (SRI)", es: "Rediseño del facturador electrónico del SRI" },
    short: { en: "A human-centred redesign of the tax authority's invoice flow, prototyped in Figma.", es: "Un rediseño centrado en las personas del flujo de facturación del SRI, prototipado en Figma." },
    desc: { en: "A Human–Computer Interaction project: we studied how people struggle with the official invoicing tool and proposed a guided, step-by-step flow, presented in a video and an interactive prototype.",
            es: "Proyecto de Interacción Humano-Computador: estudiamos las dificultades de las personas con el facturador oficial y propusimos un flujo guiado paso a paso, presentado en un video y un prototipo interactivo." },
    did: { en: ["DRAFT · Daniel: research method and key findings", "Step-by-step invoice wizard prototype"], es: ["BORRADOR · Daniel: método de investigación y hallazgos", "Prototipo de asistente de facturación paso a paso"] },
    tech: ["Figma", "User research"],
    links: [{ t: "figma", u: "https://www.figma.com/make/3B6GoCk2dkoPUfT2bJ5wp0/Invoice-Wizard-Design?fullscreen=1&t=PkJCDiROb9Ut1SuO-1&code-node-id=0-9" }, { t: "video", u: "https://drive.google.com/file/d/1IxkUrsPvYqDoRvacBT3pUclQym34asGu/view?usp=sharing" }] }
];

const TIMELINE = [
  { when: { en: "Before 2024", es: "Antes de 2024" }, mark: "?", draft: true,
    title: { en: "Physics competitions & school physics club", es: "Concursos de física y club de física del colegio" },
    text: { en: "DRAFT · Daniel: which competitions, which school, what you won and the moment physics clicked.", es: "BORRADOR · Daniel: qué concursos, qué colegio, qué ganaste y el momento en que la física hizo clic." } },
  { when: { en: "2024 — now", es: "2024 — hoy" }, mark: "∂",
    title: { en: "Teaching assistant", es: "Ayudante de cátedra" }, org: "UEES",
    text: { en: "Mathematics I, Mathematics III and Physics I. I also teach IB mathematics and Python.", es: "Matemáticas I, Matemáticas III y Física I. También enseño matemáticas IB y Python." } },
  { when: { en: "Apr 2024 — 2028", es: "abr. 2024 — 2028" }, mark: "{ }",
    title: { en: "Computer Engineering", es: "Ingeniería en Computación" }, org: "UEES",
    text: { en: "Overall GPA 95.06/100 · Dean's List with 97.08 in Ordinario I 2024.", es: "Promedio general 95,06/100 · Dean's List con 97,08 en el Ordinario I 2024." } },
  { when: { en: "2025", es: "2025" }, mark: "↗",
    title: { en: "Entrepreneurship", es: "Emprendimiento" }, org: "EUNOIA · Eureka Factory",
    text: { en: "Member of UEES's EUNOIA entrepreneurship club and the Eureka Factory incubator.", es: "Miembro del club de emprendimiento EUNOIA de la UEES y de la incubadora Eureka Factory." } },
  { when: { en: "2026 · dates TBC", es: "2026 · fechas por confirmar" }, mark: "IT", draft: true,
    title: { en: "IT intern · IT audit & cybersecurity", es: "Pasante de IT · auditoría informática y ciberseguridad" }, org: "Grant Thornton Ecuador",
    text: { en: "Compliance documentation for an international audit, IT support and infrastructure. I also built an internal search tool for tax-court rulings on top of NotebookLM.", es: "Documentación de cumplimiento para una auditoría internacional, soporte técnico e infraestructura. También construí una herramienta interna de búsqueda de sentencias tributarias sobre NotebookLM." } },
  { when: { en: "Jun 2026", es: "jun. 2026" }, mark: "♻",
    title: { en: "Cascos Verdes certification", es: "Certificación Cascos Verdes" }, org: "UNITAR · EKOS",
    text: { en: "Certification issued by UNITAR and EKOS. DRAFT · Daniel: one line on what it covered.", es: "Certificación otorgada por UNITAR y EKOS. BORRADOR · Daniel: una línea sobre de qué trató." }, draft: true },
  { when: { en: "Jul 2026", es: "jul. 2026" }, mark: "3", hl: true, open: "wids",
    title: { en: "3rd place · WiDS Datathon", es: "3.er lugar · Datathon WiDS" }, org: "ESPOL",
    text: { en: "Team Artemis reached the podium of the Women in Data Science Datathon.", es: "El equipo Artemis llegó al podio del Datathon Women in Data Science." } },
  { when: { en: "Sep 2026 — Jan 2027", es: "sep. 2026 — ene. 2027" }, mark: "OVD", hl: true, filter: "ml",
    title: { en: "Exchange semester", es: "Semestre de intercambio" }, org: "Universidad de Oviedo",
    text: { en: "Data Analysis in Modern Physics with Prof. Pietro Vischia, Nuclear and Particle Physics, and Intelligent Systems. Machine learning on particle-physics data, for real.", es: "Análisis de Datos en Física Moderna con el profesor Pietro Vischia, Física Nuclear y de Partículas, y Sistemas Inteligentes. Machine learning con datos de física de partículas, de verdad." } }
];

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.";
/* "My story with physics": a mosaic. size: w2 = two columns wide, h2 = two rows tall, photo = space for a picture */
const BENTO = [
  { size: "w2", t: { en: "Competitions & the school physics club", es: "Concursos y el club de física del colegio" }, q: { en: "Which competition hooked you first?", es: "¿Qué concurso te enganchó primero?" } },
  { size: "", t: { en: "Why I started teaching", es: "Por qué empecé a enseñar" }, q: { en: "What did teaching show you about physics?", es: "¿Qué te enseñó enseñar sobre la física?" } },
  { size: "h2 photo", t: { en: "Studying physics from Guayaquil", es: "Estudiar física desde Guayaquil" }, q: { en: "What was missing, and how did you work around it?", es: "¿Qué faltaba y cómo lo resolviste?" }, ph: { en: "photo · Guayaquil", es: "foto · Guayaquil" } },
  { size: "", t: { en: "Outreach in Latin America", es: "Divulgación en Latinoamérica" }, q: { en: "What have you done to share physics, and why here?", es: "¿Qué has hecho para divulgar la física y por qué aquí?" } },
  { size: "w2", t: { en: "When computing met physics", es: "Cuando la computación encontró a la física" }, q: { en: "When did you see how connected they are?", es: "¿Cuándo viste lo conectadas que están?" } },
  { size: "w2 photo", t: { en: "Why Oviedo", es: "Por qué Oviedo" }, q: { en: "How did the exchange change your view?", es: "¿Cómo cambió tu mirada el intercambio?" }, ph: { en: "photo · Oviedo", es: "foto · Oviedo" } },
  { size: "w2 quote", quote: { en: "Physics is beautiful.", es: "La física es hermosa." } }
];

/* Inspiration shelf (books, videos, podcasts): switched off for now; set to true to bring it back later */
const SHOW_INSPIRATION = false;

/* The universe is the map of the page: each stop = one section */
const LEVELS = [
  { id: "bh", go: "#universe", scale: "≈ 10¹⁰ m",
    name: { en: "Black hole", es: "Agujero negro" }, sec: { en: "Intro", es: "Intro" },
    h: { en: "Every journey starts somewhere dense", es: "Todo viaje empieza en un lugar denso" },
    p: { en: "Scroll over the map, or press →, to fall in. Each stop of this trip is one part of my portfolio.", es: "Haz scroll sobre el mapa o pulsa → para caer dentro. Cada parada de este viaje es una parte de mi portafolio." },
    cta: { en: "Fall in →", es: "Déjate caer →" } },
  { id: "cluster", go: "#work", scale: "≈ 10²³ m",
    name: { en: "Galaxy cluster", es: "Cúmulo de galaxias" }, sec: { en: "Work", es: "Proyectos" },
    h: { en: "My work", es: "Mi trabajo" },
    p: { en: "Each galaxy is one area of my work. Click one to open those projects below.", es: "Cada galaxia es un área de mi trabajo. Haz clic en una para abrir esos proyectos abajo." },
    cta: { en: "See all projects ↓", es: "Ver todos los proyectos ↓" } },
  { id: "solar", go: "#about", scale: "≈ 10¹³ m",
    name: { en: "Solar System", es: "Sistema Solar" }, sec: { en: "About me", es: "Sobre mí" },
    h: { en: "About me", es: "Sobre mí" },
    p: { en: "The Sun is me. The planets are what keeps me in orbit.", es: "El Sol soy yo. Los planetas son lo que me mantiene en órbita." },
    cta: { en: "Read my story ↓", es: "Leer mi historia ↓" } },
  { id: "earth", go: "#journey", scale: "≈ 10⁷ m",
    name: { en: "Earth", es: "Tierra" }, sec: { en: "Journey", es: "Trayectoria" },
    h: { en: "My journey", es: "Mi trayectoria" },
    p: { en: "From Guayaquil to Oviedo: about 8,700 km so far.", es: "De Guayaquil a Oviedo: unos 8.700 km hasta ahora." },
    cta: { en: "See my journey ↓", es: "Ver mi trayectoria ↓" } }
];
/* Planets of the Solar System stop: things that keep me in orbit */
const PLANETS = [
  { en: "Physics", es: "Física", color: "#7cb2ff", r: .16, size: 6 },
  { en: "Machine learning", es: "Machine learning", color: "#e8b64c", r: .34, size: 9 },
  { en: "Teaching", es: "Enseñar", color: "#62e3b5", r: .52, size: 7 },
  { en: "Software", es: "Software", color: "#ff9f5a", r: .72, size: 12, ring: true },
  { en: "Outreach", es: "Divulgación", color: "#c6b3ff", r: .92, size: 8 }
];
const SHELF = { books: [150, 172, 140, 160, 180, 130], videos: 3, podcasts: 3 };
