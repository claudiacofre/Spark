
export const getIndex = (req, res) => {
    res.render('index', {
        nombreProyecto: 'Spark',
        mensaje: 'Encendiendo ideas.'
    });
};

export const getStatus = (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    });
};


