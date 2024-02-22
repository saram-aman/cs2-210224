const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Get the uploaded picture from the request
    const picture = req.files && req.files.picture;

    if (!picture) {
        context.res = {
            status: 400,
            body: "No picture uploaded."
        };
        return;
    }

    // Save the picture to Azure Blob Storage
    const connectionString = process.env.AzureWebJobsStorage;
    const containerName = "pictures";
    const blobName = `${Date.now()}-${picture.name}`;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadStream(picture.data, picture.data.length);

    // Construct the URL of the uploaded picture
    const imageUrl = `${containerClient.url}/${blobName}`;

    context.res = {
        body: imageUrl
    };
};
