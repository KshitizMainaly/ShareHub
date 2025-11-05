async function handleDownload(e, fileUrl, fileName) {
    e.preventDefault();
    
    try {
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        
        // Create a temporary download link
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
    } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download file. Please try again.');
    }
}