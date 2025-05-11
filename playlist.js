// Playlist Management System

// Data structure for playlists
let playlists = [];
let currentPlaylistId = null;
let currentSongToAdd = null;

// DOM Elements
const createPlaylistBtn = document.getElementById("create-playlist-btn");
const createPlaylistModal = document.getElementById("create-playlist-modal");
const createPlaylistForm = document.getElementById("create-playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistDescInput = document.getElementById("playlist-description");
const playlistCoverInput = document.getElementById("playlist-cover");
const playlistCoverPreview = document.getElementById("playlist-cover-preview");
const uploadCoverBtn = document.getElementById("upload-cover-btn");

const addToPlaylistModal = document.getElementById("add-to-playlist-modal");
const playlistsList = document.getElementById("playlists-list");
const playlistSearch = document.getElementById("playlist-search");

const playlistDetailModal = document.getElementById("playlist-detail-modal");
const detailCover = document.getElementById("detail-cover");
const detailName = document.getElementById("detail-name");
const detailDescription = document.getElementById("detail-description");
const detailSongCount = document.getElementById("detail-song-count");
const playlistSongs = document.getElementById("playlist-songs");
const emptyPlaylistMessage = document.getElementById("empty-playlist-message");
const playPlaylistBtn = document.getElementById("play-playlist-btn");
const editPlaylistBtn = document.getElementById("edit-playlist-btn");
const deletePlaylistBtn = document.getElementById("delete-playlist-btn");

const editPlaylistModal = document.getElementById("edit-playlist-modal");
const editPlaylistForm = document.getElementById("edit-playlist-form");
const editPlaylistId = document.getElementById("edit-playlist-id");
const editPlaylistName = document.getElementById("edit-playlist-name");
const editPlaylistDesc = document.getElementById("edit-playlist-description");
const editCoverPreview = document.getElementById("edit-cover-preview");
const editPlaylistCover = document.getElementById("edit-playlist-cover");
const editUploadCoverBtn = document.getElementById("edit-upload-cover-btn");

const deleteConfirmationModal = document.getElementById(
  "delete-confirmation-modal"
);
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

// Declare missing variables
const songs = [];
let currentSongIndex = 0;
let isPlaying = false;

// Initialize playlists from localStorage
function initPlaylists() {
  const storedPlaylists = localStorage.getItem("soundstream_playlists");
  if (storedPlaylists) {
    playlists = JSON.parse(storedPlaylists);
  } else {
    // Create default playlists if none exist
    playlists = [
      {
        id: "default-1",
        name: "My First Playlist",
        description: "A collection of my favorite songs",
        coverUrl:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        songs: [],
        createdAt: new Date().toISOString(),
      },
    ];
    savePlaylists();
  }

  // Update the UI
  updatePlaylistsPage();
}

// Save playlists to localStorage
function savePlaylists() {
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));
}

// Generate a unique ID for playlists
function generateId() {
  return (
    "playlist-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9)
  );
}

// Create a new playlist
function createPlaylist(name, description, coverUrl) {
  const newPlaylist = {
    id: generateId(),
    name: name,
    description: description || "No description",
    coverUrl:
      coverUrl ||
      "https://via.placeholder.com/200/22d3ee/ffffff?text=" +
        encodeURIComponent(name.charAt(0)),
    songs: [],
    createdAt: new Date().toISOString(),
  };

  playlists.push(newPlaylist);
  savePlaylists();
  updatePlaylistsPage();

  return newPlaylist;
}

// Update the playlists page with current playlists
function updatePlaylistsPage() {
  const playlistGrid = document.querySelector("#playlists-page .playlist-grid");
  if (!playlistGrid) return;

  // Clear existing content
  playlistGrid.innerHTML = "";

  // Add each playlist
  playlists.forEach((playlist) => {
    const card = document.createElement("div");
    card.className = "playlist-card";
    card.dataset.playlistId = playlist.id;

    card.innerHTML = `
      <div class="playlist-image">
        <img src="${playlist.coverUrl}" alt="${playlist.name}">
        <button class="play-button">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="playlist-info">
        <h3>${playlist.name}</h3>
        <p>${playlist.description}</p>
      </div>
    `;

    // Add click event to open playlist detail
    card.addEventListener("click", () => {
      openPlaylistDetail(playlist.id);
    });

    // Add context menu button
    const menuBtn = document.createElement("button");
    menuBtn.className = "card-menu-button";
    menuBtn.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
    menuBtn.style.position = "absolute";
    menuBtn.style.top = "8px";
    menuBtn.style.right = "8px";
    menuBtn.style.background = "rgba(0, 0, 0, 0.5)";
    menuBtn.style.border = "none";
    menuBtn.style.borderRadius = "50%";
    menuBtn.style.width = "30px";
    menuBtn.style.height = "30px";
    menuBtn.style.display = "flex";
    menuBtn.style.alignItems = "center";
    menuBtn.style.justifyContent = "center";
    menuBtn.style.color = "white";
    menuBtn.style.cursor = "pointer";
    menuBtn.style.opacity = "0";
    menuBtn.style.transition = "opacity 0.2s";

    const imageContainer = card.querySelector(".playlist-image");
    imageContainer.style.position = "relative";
    imageContainer.appendChild(menuBtn);

    // Show menu button on hover
    card.addEventListener("mouseenter", () => {
      menuBtn.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      menuBtn.style.opacity = "0";
    });

    // Handle menu button click
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Show context menu with edit/delete options
      showPlaylistContextMenu(e, playlist.id);
    });

    playlistGrid.appendChild(card);
  });

  // Add "Create Playlist" card if there are fewer than 10 playlists
  if (playlists.length < 10) {
    const createCard = document.createElement("div");
    createCard.className = "playlist-card create-playlist-card";
    createCard.innerHTML = `
      <div class="playlist-image" style="display: flex; align-items: center; justify-content: center; background-color: rgba(255, 255, 255, 0.05);">
        <i class="fa-solid fa-plus" style="font-size: 3rem; color: rgba(255, 255, 255, 0.3);"></i>
      </div>
      <div class="playlist-info" style="text-align: center;">
        <h3>Create Playlist</h3>
        <p>Add a new playlist</p>
      </div>
    `;

    createCard.addEventListener("click", () => {
      openCreatePlaylistModal();
    });

    playlistGrid.appendChild(createCard);
  }
}

// Show context menu for playlist
function showPlaylistContextMenu(event, playlistId) {
  // Create a temporary context menu
  const contextMenu = document.createElement("div");
  contextMenu.className = "context-menu";
  contextMenu.style.position = "fixed";
  contextMenu.style.top = `${event.clientY}px`;
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.backgroundColor = "rgba(30, 30, 30, 0.95)";
  contextMenu.style.borderRadius = "8px";
  contextMenu.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
  contextMenu.style.padding = "0.5rem";
  contextMenu.style.zIndex = "2000";

  // Add menu items
  const editItem = document.createElement("div");
  editItem.className = "context-menu-item";
  editItem.innerHTML = '<i class="fa-solid fa-pencil"></i> Edit playlist';
  editItem.style.padding = "0.5rem 1rem";
  editItem.style.cursor = "pointer";
  editItem.style.borderRadius = "4px";
  editItem.style.display = "flex";
  editItem.style.alignItems = "center";
  editItem.style.gap = "0.5rem";

  editItem.addEventListener("mouseover", () => {
    editItem.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  });

  editItem.addEventListener("mouseout", () => {
    editItem.style.backgroundColor = "transparent";
  });

  editItem.addEventListener("click", () => {
    document.body.removeChild(contextMenu);
    openEditPlaylistModal(playlistId);
  });

  const deleteItem = document.createElement("div");
  deleteItem.className = "context-menu-item";
  deleteItem.innerHTML = '<i class="fa-solid fa-trash"></i> Delete playlist';
  deleteItem.style.padding = "0.5rem 1rem";
  deleteItem.style.cursor = "pointer";
  deleteItem.style.borderRadius = "4px";
  deleteItem.style.color = "#f87171";
  deleteItem.style.display = "flex";
  deleteItem.style.alignItems = "center";
  deleteItem.style.gap = "0.5rem";

  deleteItem.addEventListener("mouseover", () => {
    deleteItem.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
  });

  deleteItem.addEventListener("mouseout", () => {
    deleteItem.style.backgroundColor = "transparent";
  });

  deleteItem.addEventListener("click", () => {
    document.body.removeChild(contextMenu);
    openDeleteConfirmation(playlistId);
  });

  contextMenu.appendChild(editItem);
  contextMenu.appendChild(deleteItem);
  document.body.appendChild(contextMenu);

  // Close menu when clicking outside
  const closeContextMenu = (e) => {
    if (!contextMenu.contains(e.target)) {
      document.body.removeChild(contextMenu);
      document.removeEventListener("click", closeContextMenu);
    }
  };

  // Delay adding the event listener to prevent immediate closing
  setTimeout(() => {
    document.addEventListener("click", closeContextMenu);
  }, 100);
}

// Open the create playlist modal
function openCreatePlaylistModal() {
  createPlaylistModal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Reset form
  createPlaylistForm.reset();
  playlistCoverPreview.src =
    "https://via.placeholder.com/200/22d3ee/ffffff?text=Cover";
}

// Open the edit playlist modal
function openEditPlaylistModal(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  editPlaylistId.value = playlist.id;
  editPlaylistName.value = playlist.name;
  editPlaylistDesc.value = playlist.description;
  editCoverPreview.src = playlist.coverUrl;

  editPlaylistModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open delete confirmation modal
function openDeleteConfirmation(playlistId) {
  currentPlaylistId = playlistId;
  deleteConfirmationModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Open the add to playlist modal
function openAddToPlaylistModal(songData) {
  currentSongToAdd = songData;

  // Populate playlists list
  updatePlaylistsList();

  addToPlaylistModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Update the playlists list in the add to playlist modal
function updatePlaylistsList() {
  playlistsList.innerHTML = "";

  if (playlists.length === 0) {
    playlistsList.innerHTML = `
      <div class="empty-playlists-message" style="text-align: center; padding: 2rem;">
        <p>You don't have any playlists yet.</p>
        <button id="create-new-playlist-btn" class="modal-button" style="margin-top: 1rem;">Create Playlist</button>
      </div>
    `;

    document
      .getElementById("create-new-playlist-btn")
      .addEventListener("click", () => {
        addToPlaylistModal.style.display = "none";
        openCreatePlaylistModal();
      });

    return;
  }

  playlists.forEach((playlist) => {
    const item = document.createElement("div");
    item.className = "playlist-item";
    item.dataset.playlistId = playlist.id;

    item.innerHTML = `
      <div class="playlist-item-image">
        <img src="${playlist.coverUrl}" alt="${playlist.name}">
      </div>
      <div class="playlist-item-info">
        <h3>${playlist.name}</h3>
        <p>${playlist.songs.length} songs</p>
      </div>
    `;

    item.addEventListener("click", () => {
      addSongToPlaylist(playlist.id, currentSongToAdd);
      addToPlaylistModal.style.display = "none";
      document.body.style.overflow = "";

      // Show confirmation toast
      showToast(`Added to ${playlist.name}`);
    });

    playlistsList.appendChild(item);
  });
}

// Add a song to a playlist
function addSongToPlaylist(playlistId, songData) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  // Check if song already exists in playlist
  const songExists = playlist.songs.some((song) => song.id === songData.id);
  if (songExists) {
    showToast("Song already in playlist");
    return;
  }

  playlist.songs.push(songData);
  savePlaylists();

  // Update UI if the playlist detail is open
  if (currentPlaylistId === playlistId) {
    updatePlaylistDetail(playlistId);
  }
}

// Remove a song from a playlist
function removeSongFromPlaylist(playlistId, songId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  playlist.songs = playlist.songs.filter((song) => song.id !== songId);
  savePlaylists();

  // Update UI
  updatePlaylistDetail(playlistId);
}

// Open playlist detail view
function openPlaylistDetail(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  currentPlaylistId = playlistId;

  // Update detail view with playlist info
  detailCover.src = playlist.coverUrl;
  detailName.textContent = playlist.name;
  detailDescription.textContent = playlist.description;
  detailSongCount.textContent = `${playlist.songs.length} songs`;

  // Populate songs list
  updatePlaylistSongs(playlist);

  // Show the modal
  playlistDetailModal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Update the songs list in the playlist detail view
function updatePlaylistSongs(playlist) {
  playlistSongs.innerHTML = "";

  if (playlist.songs.length === 0) {
    emptyPlaylistMessage.classList.remove("hidden");
    return;
  }

  emptyPlaylistMessage.classList.add("hidden");

  playlist.songs.forEach((song, index) => {
    const songElement = document.createElement("div");
    songElement.className = "playlist-song";
    songElement.dataset.songId = song.id;
    songElement.draggable = true;

    songElement.innerHTML = `
      <div class="song-number">${index + 1}</div>
      <div class="song-info">
        <div class="song-thumbnail">
          <img src="${song.cover}" alt="${song.title}">
        </div>
        <div class="song-details">
          <div class="song-title">${song.title}</div>
          <div class="song-artist">${song.artist}</div>
        </div>
      </div>
      <div class="song-duration">${formatTime(song.duration)}</div>
      <div class="song-actions">
        <button class="song-action-btn play-song-btn" title="Play">
          <i class="fa-solid fa-play"></i>
        </button>
        <button class="song-action-btn remove-song-btn" title="Remove">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
    `;

    // Play song button
    songElement
      .querySelector(".play-song-btn")
      .addEventListener("click", () => {
        playSong(song);
      });

    // Remove song button
    songElement
      .querySelector(".remove-song-btn")
      .addEventListener("click", () => {
        removeSongFromPlaylist(currentPlaylistId, song.id);
      });

    // Drag and drop functionality
    songElement.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", song.id);
      songElement.classList.add("dragging");
    });

    songElement.addEventListener("dragend", () => {
      songElement.classList.remove("dragging");
    });

    songElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      songElement.classList.add("drag-over");
    });

    songElement.addEventListener("dragleave", () => {
      songElement.classList.remove("drag-over");
    });

    songElement.addEventListener("drop", (e) => {
      e.preventDefault();
      songElement.classList.remove("drag-over");

      const draggedSongId = e.dataTransfer.getData("text/plain");
      const targetSongId = song.id;

      if (draggedSongId !== targetSongId) {
        reorderPlaylistSongs(currentPlaylistId, draggedSongId, targetSongId);
      }
    });

    playlistSongs.appendChild(songElement);
  });
}

// Reorder songs in a playlist
function reorderPlaylistSongs(playlistId, draggedSongId, targetSongId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  const draggedIndex = playlist.songs.findIndex(
    (song) => song.id === draggedSongId
  );
  const targetIndex = playlist.songs.findIndex(
    (song) => song.id === targetSongId
  );

  if (draggedIndex === -1 || targetIndex === -1) return;

  // Remove the dragged song
  const [draggedSong] = playlist.songs.splice(draggedIndex, 1);

  // Insert it at the target position
  playlist.songs.splice(targetIndex, 0, draggedSong);

  savePlaylists();
  updatePlaylistSongs(playlist);
}

// Update playlist detail view
function updatePlaylistDetail(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  detailSongCount.textContent = `${playlist.songs.length} songs`;
  updatePlaylistSongs(playlist);
}

// Play a song
function playSong(song) {
  // Find the song in the global songs array
  const songIndex = songs.findIndex((s) => s.id === song.id);

  if (songIndex !== -1) {
    currentSongIndex = songIndex;
    loadSong(currentSongIndex);
    isPlaying = true;
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    // Close the playlist detail modal
    playlistDetailModal.style.display = "none";
    document.body.style.overflow = "";
  } else {
    // If the song is not in the global songs array, add it
    songs.push(song);
    currentSongIndex = songs.length - 1;
    loadSong(currentSongIndex);
    isPlaying = true;
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

    // Close the playlist detail modal
    playlistDetailModal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// Play all songs in a playlist
function playPlaylist(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist || playlist.songs.length === 0) return;

  // Replace the global songs array with the playlist songs
  // This is a simplified approach - in a real app, you might want to keep the original songs
  // and just create a queue of the playlist songs
  songs.length = 0;
  playlist.songs.forEach((song) => songs.push(song));

  // Start playing the first song
  currentSongIndex = 0;
  loadSong(currentSongIndex);
  isPlaying = true;
  audioPlayer.play();
  playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

  // Close the playlist detail modal
  playlistDetailModal.style.display = "none";
  document.body.style.overflow = "";
}

// Delete a playlist
function deletePlaylist(playlistId) {
  playlists = playlists.filter((p) => p.id !== playlistId);
  savePlaylists();
  updatePlaylistsPage();

  // Close the delete confirmation modal
  deleteConfirmationModal.style.display = "none";
  document.body.style.overflow = "";

  // If the playlist detail modal is open, close it
  if (currentPlaylistId === playlistId) {
    playlistDetailModal.style.display = "none";
  }

  showToast("Playlist deleted");
}

// Show a toast notification
function showToast(message) {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Get or create toast container
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.style.position = "fixed";
    toastContainer.style.bottom = "20px";
    toastContainer.style.right = "20px";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  // Add toast to container
  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Mock functions to resolve errors. These should be defined elsewhere in the project.
function formatTime(duration) {
  // Implementation for formatTime
  return "0:00";
}

function loadSong(songIndex) {
  // Implementation for loadSong
}

const audioPlayer = {
  play: () => {},
};

const playPauseBtn = {
  innerHTML: "",
};
