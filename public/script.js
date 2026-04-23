document.addEventListener('DOMContentLoaded', () => {
    // ELEMENTOS DEL DOM
    const btnPublish = document.getElementById('btnPublish');
    const contentInput = document.getElementById('sparkContent');
    const fileInput = document.getElementById('fileInput');
    const btnUpload = document.getElementById('btnUpload');
    const uploadForm = document.getElementById('uploadForm');
    const uploadMessage = document.getElementById('uploadMessage');
    const avatarPreview = document.getElementById('avatarPreview');

    // --- 1. LÓGICA DE SUBIDA DE FOTO DE PERFIL (MÓDULO 8) ---
    if (fileInput && uploadForm) {
        // Mostrar botón de confirmación cuando se elige un archivo
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                btnUpload.classList.remove('d-none');
                if (uploadMessage) uploadMessage.innerHTML = ''; 
            }
        });

        // Enviar el archivo al servidor
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);

            try {
                uploadMessage.innerHTML = '<span class="text-info">Subiendo archivo... ⏳</span>';
                
                const response = await fetch('/api/users/upload', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (response.ok) {
                    // CAMBIO VISUAL INMEDIATO: Actualiza el círculo con la nueva foto
                    if (avatarPreview) {
                        avatarPreview.src = result.data.url;
                    }
                    
                    uploadMessage.innerHTML = '<span class="text-success">¡Foto actualizada con éxito! ✨</span>';
                    btnUpload.classList.add('d-none'); // Esconde el botón tras subir
                   
                } else {
                    uploadMessage.innerHTML = `<span class="text-danger">Error: ${result.message}</span>`;
                }
            } catch (err) {
                console.error("Error en la subida:", err);
                uploadMessage.innerHTML = '<span class="text-danger">Error de conexión con el servidor</span>';
            }
        });
    }

    // --- 2. LÓGICA DE PUBLICAR SPARKS (CHISPAS) ---
    if (btnPublish && contentInput) {
        btnPublish.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const content = contentInput.value.trim();
            if (!content) return alert("¡La chispa no puede estar vacía! ✨");

            try {
                const response = await fetch('/api/sparks/publish', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content })
                });

                if (response.ok) {
                    contentInput.value = ''; // Limpia el textarea
                    window.location.reload(); // Recarga para mostrar la nueva chispa
                } else {
                    alert("Hubo un problema al publicar. Inténtalo de nuevo.");
                }
            } catch (err) {
                console.error("Error al publicar:", err);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }
});