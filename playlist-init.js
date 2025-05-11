// Initialize playlist functionality
document.addEventListener("DOMContentLoaded", () => {
  // Load playlist modals HTML
  fetch("playlist-modals.html")
    .then((response) => response.text())
    .then((html) => {
      // Append modals to body
      document.body.insertAdjacentHTML("beforeend", html);

      // Initialize playlist functionality
      initPlaylistFeature();
    })
    .catch((error) => {
      console.error("Error loading playlist modals:", error);
    });

  // Load playlist styles
  const linkElem = document.createElement("link");
  linkElem.rel = "stylesheet";
  linkElem.href = "playlist-styles.css";
  document.head.appendChild(linkElem);
});

function initPlaylistFeature() {
  // Initialize playlists from localStorage
  initPlaylists();

  // DOM Elements - Create Playlist Modal
  const createPlaylistModal = document.getElementById("create-playlist-modal");
  const createPlaylistForm = document.getElementById("create-playlist-form");
  const playlistNameInput = document.getElementById("playlist-name");
  const playlistDescInput = document.getElementById("playlist-description");
  const playlistCoverInput = document.getElementById("playlist-cover");
  const playlistCoverPreview = document.getElementById(
    "playlist-cover-preview"
  );
  const uploadCoverBtn = document.getElementById("upload-cover-btn");

  // DOM Elements - Edit Playlist Modal
  const editPlaylistModal = document.getElementById("edit-playlist-modal");
  const editPlaylistForm = document.getElementById("edit-playlist-form");
  const editPlaylistId = document.getElementById("edit-playlist-id");
  const editPlaylistName = document.getElementById("edit-playlist-name");
  const editPlaylistDesc = document.getElementById("edit-playlist-description");
  const editCoverPreview = document.getElementById("edit-cover-preview");
  const editPlaylistCover = document.getElementById("edit-playlist-cover");
  const editUploadCoverBtn = document.getElementById("edit-upload-cover-btn");

  // DOM Elements - Add to Playlist Modal
  const addToPlaylistModal = document.getElementById("add-to-playlist-modal");
  const playlistSearch = document.getElementById("playlist-search");

  // DOM Elements - Playlist Detail Modal
  const playlistDetailModal = document.getElementById("playlist-detail-modal");
  const playPlaylistBtn = document.getElementById("play-playlist-btn");
  const editPlaylistBtn = document.getElementById("edit-playlist-btn");
  const deletePlaylistBtn = document.getElementById("delete-playlist-btn");

  // DOM Elements - Delete Confirmation Modal
  const deleteConfirmationModal = document.getElementById(
    "delete-confirmation-modal"
  );
  const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

  // Close modals when clicking the close button
  document.querySelectorAll(".close-modal").forEach((button) => {
    button.addEventListener("click", () => {
      createPlaylistModal.style.display = "none";
      editPlaylistModal.style.display = "none";
      addToPlaylistModal.style.display = "none";
      playlistDetailModal.style.display = "none";
      deleteConfirmationModal.style.display = "none";
      document.body.style.overflow = "";
    });
  });

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === createPlaylistModal) {
      createPlaylistModal.style.display = "none";
      document.body.style.overflow = "";
    }
    if (e.target === editPlaylistModal) {
      editPlaylistModal.style.display = "none";
      document.body.style.overflow = "";
    }
    if (e.target === addToPlaylistModal) {
      addToPlaylistModal.style.display = "none";
      document.body.style.overflow = "";
    }
    if (e.target === playlistDetailModal) {
      playlistDetailModal.style.display = "none";
      document.body.style.overflow = "";
    }
    if (e.target === deleteConfirmationModal) {
      deleteConfirmationModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Upload cover image in create playlist modal
  uploadCoverBtn.addEventListener("click", () => {
    playlistCoverInput.click();
  });

  playlistCoverInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        playlistCoverPreview.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  });

  // Upload cover image in edit playlist modal
  editUploadCoverBtn.addEventListener("click", () => {
    editPlaylistCover.click();
  });

  editPlaylistCover.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        editCoverPreview.src = event.target.result;
      };

      reader.readAsDataURL(file);
    }
  });

  // Create playlist form submission
  createPlaylistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = playlistNameInput.value;
    const description = playlistDescInput.value;
    const coverUrl = playlistCoverPreview.src;

    createPlaylist(name, description, coverUrl);

    // Close modal
    createPlaylistModal.style.display = "none";
    document.body.style.overflow = "";

    // Show confirmation toast
    showToast("Playlist created");
  });

  // Edit playlist form submission
  editPlaylistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = editPlaylistId.value;
    const name = editPlaylistName.value;
    const description = editPlaylistDesc.value;
    const coverUrl = editCoverPreview.src;

    // Find and update the playlist
    const playlist = playlists.find((p) => p.id === id);
    if (playlist) {
      playlist.name = name;
      playlist.description = description;
      playlist.coverUrl = coverUrl;

      savePlaylists();
      updatePlaylistsPage();

      // If the playlist detail is open, update it
      if (currentPlaylistId === id) {
        updatePlaylistDetail(id);
      }
    }

    // Close modal
    editPlaylistModal.style.display = "none";
    document.body.style.overflow = "";

    // Show confirmation toast
    showToast("Playlist updated");
  });

  // Search playlists in add to playlist modal
  playlistSearch.addEventListener("input", () => {
    const searchTerm = playlistSearch.value.toLowerCase();
    const playlistItems = document.querySelectorAll(".playlist-item");

    playlistItems.forEach((item) => {
      const playlistName = item.querySelector("h3").textContent.toLowerCase();

      if (playlistName.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Playlist detail actions
  playPlaylistBtn.addEventListener("click", () => {
    playPlaylist(currentPlaylistId);
  });

  editPlaylistBtn.addEventListener("click", () => {
    playlistDetailModal.style.display = "none";
    openEditPlaylistModal(currentPlaylistId);
  });

  deletePlaylistBtn.addEventListener("click", () => {
    playlistDetailModal.style.display = "none";
    openDeleteConfirmation(currentPlaylistId);
  });

  // Delete confirmation actions
  cancelDeleteBtn.addEventListener("click", () => {
    deleteConfirmationModal.style.display = "none";
    document.body.style.overflow = "";
  });

  confirmDeleteBtn.addEventListener("click", () => {
    deletePlaylist(currentPlaylistId);
  });

  // Add "Add to Playlist" functionality to all song cards
  document.querySelectorAll(".track-card").forEach((card) => {
    // Create "Add to Playlist" button
    const addToPlaylistBtn = document.createElement("button");
    addToPlaylistBtn.className = "add-to-playlist-btn";
    addToPlaylistBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addToPlaylistBtn.style.position = "absolute";
    addToPlaylistBtn.style.bottom = "8px";
    addToPlaylistBtn.style.left = "8px";
    addToPlaylistBtn.style.background = "rgba(0, 0, 0, 0.5)";
    addToPlaylistBtn.style.border = "none";
    addToPlaylistBtn.style.borderRadius = "50%";
    addToPlaylistBtn.style.width = "30px";
    addToPlaylistBtn.style.height = "30px";
    addToPlaylistBtn.style.display = "flex";
    addToPlaylistBtn.style.alignItems = "center";
    addToPlaylistBtn.style.justifyContent = "center";
    addToPlaylistBtn.style.color = "white";
    addToPlaylistBtn.style.cursor = "pointer";
    addToPlaylistBtn.style.opacity = "0";
    addToPlaylistBtn.style.transition = "opacity 0.2s";

    const imageContainer = card.querySelector(".track-image");
    if (imageContainer) {
      imageContainer.appendChild(addToPlaylistBtn);

      // Show button on hover
      card.addEventListener("mouseenter", () => {
        addToPlaylistBtn.style.opacity = "1";
      });

      card.addEventListener("mouseleave", () => {
        addToPlaylistBtn.style.opacity = "0";
      });

      // Handle button click
      addToPlaylistBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const title = card.querySelector("h3").textContent;
        const artist = card.querySelector("p").textContent;
        const cover = card.querySelector("img").src;

        // Find the song in the songs array
        const song = songs.find(
          (s) => s.title === title && s.artist === artist
        );

        if (song) {
          openAddToPlaylistModal(song);
        } else {
          // If not found, create a temporary song object
          const tempSong = {
            id: `temp-${Date.now()}`,
            title: title,
            artist: artist,
            cover: cover,
            duration: 180, // Default duration
            audio: "", // No audio source
          };

          openAddToPlaylistModal(tempSong);
        }
      });
    }
  });

  // Show toast notification
  window.showToast = (message) => {
    const toastContainer = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.backgroundColor = "rgba(30, 30, 30, 0.9)";
    toast.style.color = "white";
    toast.style.padding = "0.75rem 1.25rem";
    toast.style.borderRadius = "8px";
    toast.style.marginTop = "0.5rem";
    toast.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
    toast.style.animation = "fadeIn 0.3s, fadeOut 0.3s 2.7s";
    toast.style.animationFillMode = "forwards";
    toast.textContent = message;

    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Add keyframes for toast animations
  const style = document.createElement("style");
  style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
      }
    `;
  document.head.appendChild(style);
}
