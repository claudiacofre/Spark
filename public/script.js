const feedElement = document.getElementById('feed');
const btnPublish = document.getElementById('btnPublish');
const contentInput = document.getElementById('sparkContent');

//Función para cargar las chispas desde la base de datos
async function loadSparks() {
    const response = await fetch('/sparks'); // Hace un GET al servidor
    const sparks = await response.json();
    
    feedElement.innerHTML = ''; // Limpia el feed
    
    sparks.forEach(spark => {
        const div = document.createElement('div');
        div.className = 'spark-card';
        div.innerHTML = `
            <p>${spark.content}</p>
            <small>${new Date(spark.createdAt).toLocaleString()}</small>
        `;
        feedElement.appendChild(div);
    });
}

// 2. Función para publicar una nueva chispa 
btnPublish.addEventListener('click', async (event) => {
    event.preventDefault();
    const content = contentInput.value;
    
    if (!content) return alert("¡Escribe algo primero!");

    await fetch('/sparks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    contentInput.value = ''; 
    loadSparks(); // Recarga el feed para ver la nueva chispa
});

// Cargar al iniciar la página
loadSparks();