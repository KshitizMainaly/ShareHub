document.addEventListener("DOMContentLoaded", () => {
  //  File Input (Show filename)
  const fileInput = document.getElementById("file-input");
  const fileNameDisplay = document.getElementById("file-name");

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        fileNameDisplay.textContent = `${file.name} (${sizeMB} MB)`;
      }
    });
  }

  //  Upload Form
  const uploadForm = document.getElementById("upload-form");

  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(uploadForm);
      const uploadBtn = document.getElementById("upload-btn");
      const progressContainer = document.getElementById("progress-container");
      const progressFill = document.getElementById("progress-fill");
      const progressText = document.getElementById("progress-text");

      // Show temporary UI feedback
      uploadBtn.disabled = true;
      uploadBtn.textContent = "Uploading...";
      progressContainer?.classList.remove("hidden");
      if (progressFill) progressFill.style.width = "50%";
      if (progressText) progressText.textContent = "Uploading...";

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        // Handle redirect or JSON
        if (response.redirected) {
          window.location.href = response.url;
          return;
        }

        const data = await response.json();
        if (data.success && data.fileId) {
          window.location.href = `/success/${data.fileId}`;
        } else {
          alert("Upload failed: " + (data.message || "Unknown error"));
          resetForm();
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Upload failed. Please try again.");
        resetForm();
      }

      function resetForm() {
        uploadBtn.disabled = false;
        uploadBtn.textContent = "Upload File";
        progressContainer?.classList.add("hidden");
        if (progressFill) progressFill.style.width = "0%";
      }
    });
  }

  // Copy Share Link (Success page)
  const copyBtn = document.getElementById("copy-btn");
  const shareLink = document.getElementById("share-link");

  if (copyBtn && shareLink) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(shareLink.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.style.background = "#27ae60";
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = "";
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        alert("Failed to copy link.");
      }
    });
  }

  //  Dashboard: Copy Link
  const dashboardCopyBtns = document.querySelectorAll(".btn-copy");
  dashboardCopyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const link = btn.getAttribute("data-link");
      if (!link) return;

      try {
        await navigator.clipboard.writeText(link);
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = originalText), 2000);
      } catch (err) {
        console.error("Copy error:", err);
      }
    });
  });

  //  Dashboard: Delete File
  const deleteBtns = document.querySelectorAll(".btn-delete");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!confirm("Are you sure you want to delete this file?")) return;

      const fileId = btn.getAttribute("data-id");
      if (!fileId) return;

      fetch(`/delete/${fileId}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            location.reload();
          } else {
            alert("Failed to delete file");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Failed to delete file");
        });
    });
  });
});
