document.addEventListener('DOMContentLoaded', () => {
    const btnPublish = document.getElementById('btnPublish');
    const contentInput = document.getElementById('sparkContent');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const btnUpload = document.getElementById('btnUpload');
    const uploadForm = document.getElementById('uploadForm');
    const uploadMessage = document.getElementById('uploadMessage');

 if (fileInput) {
        // Al seleccionar archivo, mostramos el botón de confirmar
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                btnUpload.classList.remove('d-none');
            }
        });

        // Enviar el archivo
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);

            try {
                uploadMessage.innerHTML = '<span class="text-info">Subiendo...</span>';
                const response = await fetch('/api/users/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    uploadMessage.innerHTML = '<span class="text-success">¡Subida con éxito!</span>';
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    uploadMessage.innerHTML = '<span class="text-danger">Error al subir</span>';
                }
            } catch (err) {
                uploadMessage.innerHTML = '<span class="text-danger">Error de conexión</span>';
            }
        });
    }

    if (btnPublish && contentInput) {
        btnPublish.addEventListener('click', async (event) => {
            event.preventDefault(); // Evita que el formulario se envíe de la forma vieja
            
            const content = contentInput.value.trim();
            if (!content) return alert("¡La chispa no puede estar vacía! ✨");

            try {
                const response = await fetch('/api/sparks/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content })
                });

                if (response.ok) {
                    contentInput.value = ''; // Limpia el texto
                    // LA MAGIA: Recarga la página actual para que Handlebars pinte todo perfecto
                    window.location.reload(); 
                } else {
                    alert("Hubo un problema al publicar. Inténtalo de nuevo.");
                }
            } catch (err) {
                console.error("Error de conexión:", err);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }


    // 2. Función para publicar (POST)
    if (btnPublish) {
        btnPublish.addEventListener('click', async (e) => {
            e.preventDefault(); // IMPORTANTE: evita que el form recargue solo
            
            const content = contentInput.value.trim();
            if (!content) return alert("¡Escribe algo!");

            try {
                const response = await fetch('/api/sparks/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content })
                });

                if (response.ok) {
                    contentInput.value = ''; // Limpiamos el texto
                    loadSparks(); // Refrescamos el muro sin recargar toda la página
                }
            } catch (err) {
                console.error("Error al publicar:", err);
            }
        });
    }
});