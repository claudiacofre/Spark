export const requireRole = (role) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "No autenticado",
        });
      }

      if (req.user.role !== role) {
        return res.status(403).json({
          success: false,
          message: "Acceso denegado (sin permisos)",
        });
      }

      next();

    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error en autorización",
      });
    }
  };
};