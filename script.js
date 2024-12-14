
// script.js

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('File uploaded successfully!');
            fileInput.value = '';
            loadFiles();
        } else {
            alert('Failed to upload file.');
        }
    } catch (error) {
        alert('Error uploading file: ' + error.message);
    }
});

async function loadFiles() {
    try {
        const response = await fetch('/files');
        if (response.ok) {
            const files = await response.json();
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = '';

            files.forEach(file => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = `/files/${file}`;
                link.textContent = file;
                link.download = file;
                li.appendChild(link);
                fileList.appendChild(li);
            });
        } else {
            alert('Failed to load files.');
        }
    } catch (error) {
        alert('Error loading files: ' + error.message);
    }
}

loadFiles();
