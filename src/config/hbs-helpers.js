export const formatDate = (date) => {
    if (!date) return "Fecha no disponible";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Fecha errónea";
    const hora = d.toLocaleTimeString('es-CL', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });
    const fecha = d.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    return `${hora} del ${fecha}`;
};