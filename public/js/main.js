// File upload handling
document.addEventListener('DOMContentLoaded', function() {
    // File input change handler
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const sizeMB = (file.size / 1024 / 1024).toFixed(2);
                fileNameDisplay.textContent = `${file.name} (${sizeMB} MB)`;
            }
        });
    }
    // Upload form handler with fetch (modern async)
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const uploadBtn = document.getElementById('upload-btn');
            const progressContainer = document.getElementById('progress-container');
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            // Show progress UI (no actual progress with fetch alone)
            uploadBtn.disabled = true;
            uploadBtn.textContent = 'Uploading...';
            progressContainer.classList.remove('hidden');
            progressFill.style.width = '50%';
            progressText.textContent = 'Uploading...';
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                // Try to interpret as JSON, but handle possible redirect!
                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }
                const data = await response.json();
                if (data.success && data.fileId) {
                    window.location.href = `/success/${data.fileId}`;
                } else {
                    alert('Upload failed: ' + (data.message || 'Unknown error'));
                    resetForm();
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert('Upload failed. Please try again.');
                resetForm();
            }

            function resetForm() {
                uploadBtn.disabled = false;
                uploadBtn.textContent = 'Upload File';
                progressContainer.classList.add('hidden');
                progressFill.style.width = '0%';
            }
        });
    }
    // Copy to clipboard
    const copyBtn = document.getElementById('copy-btn');
    const shareLink = document.getElementById('share-link');
    if (copyBtn && shareLink) {
        copyBtn.addEventListener('click', function() {
            shareLink.select();
            document.execCommand('copy');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.background = '#27ae60';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    }
    // Dashboard copy links
    const dashboardCopyBtns = document.querySelectorAll('.btn-copy');
    dashboardCopyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            navigator.clipboard.writeText(link).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
    // Dashboard delete files
    const deleteBtns = document.querySelectorAll('.btn-delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this file?')) {
                const fileId = this.getAttribute('data-id');
                fetch(`/delete/${fileId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert('Failed to delete file');
                    }
                })
                .catch(error => {
                    console.error('Delete error:', error);
                    alert('Failed to delete file');
                });
            }
        });
    });
});

