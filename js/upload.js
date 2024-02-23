// Function to upload picture
async function uploadPicture(file) {
    const formData = new FormData();
    formData.append('picture', file);

    try {
        const response = await fetch('https://faname-kpmg.azurewebsites.net', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const imageUrl = await response.text();
            displayImage(imageUrl);
        } else {
            console.error('Failed to upload picture. Server returned status:', response.status);
        }
    } catch (error) {
        console.error('Error uploading picture:', error);
    }
}

// Function to display uploaded image
function displayImage(imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.classList.add('uploaded-image');
    document.getElementById('imageContainer').appendChild(img);
}

// Event listener for file input change
document.getElementById('pictureInput').addEventListener('change', function() {
    const files = this.files;
    if (files.length > 0) {
        for (const file of files) {
            uploadPicture(file);
        }
    }
});

// Event listener for upload button click
document.getElementById('uploadButton').addEventListener('click', function() {
    const files = document.getElementById('pictureInput').files;
    if (files.length > 0) {
        for (const file of files) {
            uploadPicture(file);
        }
    }
});