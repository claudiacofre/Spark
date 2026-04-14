import Spark from "../models/spark.js";

export const getProfile = async (req, res) => {
    try {
        const userSparksData = await Spark.findAll({
            where: { username: 'Claudia' }, 
            order: [['created_at', 'DESC']]
        });

        const userSparks = userSparksData.map(s => s.get({ plain: true }));

        res.render('profile', {
            user: {
                username: 'Claudia',
                bio: 'Full Stack Developer Trainee'
            },
            userSparks 
        });
    } catch (error) {
        console.error("Error al cargar perfil:", error);
        res.status(500).send("Error al cargar el perfil ❌");
    }
};

export const getSettings = (req, res) => {
    res.render('settings', { 
        title: 'Configuración de cuenta',
        user: { 
            username: 'Claudia',
            email: 'claudia@ejemplo.com' 
        } 
    });
};