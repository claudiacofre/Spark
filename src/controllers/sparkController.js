// --- CONTROLADOR DE SPARK ---

export const getIndex = (req, res) => {
    try {
        // Para el Módulo 6, enviamos datos estáticos que simulan la DB
        res.render('index', { 
            sparks: [
                { content: '¡Mi primer Spark en Node!', createdAt: new Date().toLocaleString() },
                { content: 'Configurando el Módulo 6 con éxito.', createdAt: new Date().toLocaleString() }
            ] 
        });
    } catch (error) {
        res.status(500).send("Error al cargar la página de inicio.");
    }
};

export const getStatus = (req, res) => {
    // Requerimiento: Al menos una ruta debe devolver JSON 
    res.json({
        status: "ok",
        project: "SPARK",
        timestamp: new Date().toISOString(),
        folder_structure: "verified"
    });
};

export const postSpark = (req, res) => {
    const { content } = req.body;
    console.log(`Nuevo Spark recibido: ${content}`);
    // En el Módulo 7 aquí usaremos Spark.create()
    res.redirect('/'); 
};