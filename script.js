document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements - Login
  const loginContainer = document.getElementById("login-container");
  const loginForm = document.getElementById("login-form");
  const loginBtn = document.getElementById("login-btn");
  const buttonText = loginBtn.querySelector(".button-text");
  const spinner = loginBtn.querySelector(".spinner");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // DOM Elements - App
  const appContainer = document.getElementById("app");
  const userDisplay = document.getElementById("user-display");
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const logoutBtn = document.getElementById("logout-btn");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const playButtons = document.querySelectorAll(".play-button");
  const playPauseBtn = document.querySelector(".play-pause");
  const progressBar = document.querySelector(".progress-bar");
  const progressFill = document.querySelector(".progress-fill");
  const progressHandle = document.querySelector(".progress-handle");
  const volumeSlider = document.querySelector(".volume-slider");
  const volumeFill = document.querySelector(".volume-fill");
  const volumeHandle = document.querySelector(".volume-handle");

  // Add animation classes to form groups with delay
  const formGroups = document.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.animationDelay = `${0.5 + index * 0.1}s`;
  });

  // Login Form Submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show loading state
    buttonText.classList.add("hidden");
    spinner.classList.remove("hidden");

    // Simulate login process
    setTimeout(() => {
      // Hide loading state
      buttonText.classList.remove("hidden");
      spinner.classList.add("hidden");

      // Set username in the app
      userDisplay.textContent = usernameInput.value || "User";

      // Switch to app view
      loginContainer.classList.add("hidden");
      appContainer.classList.remove("hidden");

      // Log login attempt
      console.log("Login successful with:", {
        username: usernameInput.value,
        password: passwordInput.value,
      });
    }, 1500);
  });

  // Navigation between pages
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Update active nav item
      navItems.forEach((nav) => nav.classList.remove("active"));
      this.classList.add("active");

      // Show corresponding page
      const pageId = this.getAttribute("data-page");
      pages.forEach((page) => page.classList.remove("active"));
      document.getElementById(`${pageId}-page`).classList.add("active");

      // Close mobile menu if open
      if (window.innerWidth < 768) {
        sidebar.classList.remove("active");
      }
    });
  });

  // Logout button
  logoutBtn.addEventListener("click", () => {
    // Switch back to login view
    appContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");

    // Reset form
    loginForm.reset();
  });

  // Mobile menu toggle
  mobileMenuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Play buttons hover effect
  playButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Play/Pause toggle
  let isPlaying = false;
  playPauseBtn.addEventListener("click", function () {
    isPlaying = !isPlaying;
    if (isPlaying) {
      this.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  });

  // Progress bar interaction
  progressBar.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    progressFill.style.width = `${percent * 100}%`;
    progressHandle.style.left = `${percent * 100}%`;

    // Update time display (just for demo)
    const totalSeconds = 225; // 3:45 in seconds
    const currentSeconds = Math.floor(percent * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    document.querySelector(".time-elapsed").textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });

  // Volume slider interaction
  volumeSlider.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    volumeFill.style.width = `${percent * 100}%`;
    volumeHandle.style.left = `${percent * 100}%`;
  });

  // Track cards hover effect
  const trackCards = document.querySelectorAll(".track-card, .playlist-card");
  trackCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Like button functionality
  const likeButton = document.querySelector(".like-button");
  likeButton.addEventListener("click", function () {
    this.innerHTML = this.innerHTML.includes("regular")
      ? '<i class="fa-solid fa-heart" style="color: #ff4d4d;"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  });

  // Filter buttons in library
  const filterButtons = document.querySelectorAll(".filter-button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Prevent default on all buttons to avoid form submission
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.type !== "submit") {
        e.preventDefault();
      }
    });
  });
});
// Modal functionality
const signupLinks = document.querySelectorAll('a[href="#sign-up"]');
const forgotLinks = document.querySelectorAll('a[href="#forgot-password"]');
const signupModal = document.getElementById("signup-modal");
const forgotModal = document.getElementById("forgot-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const signupForm = document.getElementById("signup-form");
const forgotForm = document.getElementById("forgot-form");
const resetConfirmation = document.getElementById("reset-confirmation");

// Open modals
signupLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });
});

forgotLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    forgotModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

// Close modals
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    signupModal.style.display = "none";
    forgotModal.style.display = "none";
    resetConfirmation.classList.add("hidden");
    document.body.style.overflow = "";
  });
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === signupModal) {
    signupModal.style.display = "none";
    document.body.style.overflow = "";
  }
  if (e.target === forgotModal) {
    forgotModal.style.display = "none";
    resetConfirmation.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

// Handle signup form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  // Simple validation
  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Simulate signup process
  console.log("Sign up with:", { username, email, password });

  // Auto login after signup
  userDisplay.textContent = username;
  loginContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");
  signupModal.style.display = "none";
  document.body.style.overflow = "";
});

// Handle forgot password form
forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("forgot-email").value;

  // Simulate password reset process
  console.log("Password reset requested for:", email);

  // Show confirmation
  forgotForm.style.display = "none";
  resetConfirmation.classList.remove("hidden");

  // Reset form for next time
  setTimeout(() => {
    forgotForm.reset();
  }, 500);
});

// Favorites functionality
let favorites = [];

// Update all like buttons to be functional
document
  .querySelectorAll(".like-button, .track-card, .playlist-card")
  .forEach((item) => {
    // For the main player like button
    if (item.classList.contains("like-button")) {
      item.addEventListener("click", function () {
        const nowPlaying = document.querySelector(
          ".now-playing .track-info h4"
        ).textContent;
        const artistName = document.querySelector(
          ".now-playing .track-info p"
        ).textContent;
        const thumbnail = document.querySelector(".track-thumbnail img").src;

        toggleFavorite(this, nowPlaying, artistName, thumbnail);
      });
    }
    // For track and playlist cards
    else {
      const likeBtn = document.createElement("button");
      likeBtn.className = "card-like-button";
      likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      likeBtn.style.position = "absolute";
      likeBtn.style.top = "8px";
      likeBtn.style.right = "8px";
      likeBtn.style.background = "rgba(0, 0, 0, 0.5)";
      likeBtn.style.border = "none";
      likeBtn.style.borderRadius = "50%";
      likeBtn.style.width = "30px";
      likeBtn.style.height = "30px";
      likeBtn.style.display = "flex";
      likeBtn.style.alignItems = "center";
      likeBtn.style.justifyContent = "center";
      likeBtn.style.color = "white";
      likeBtn.style.cursor = "pointer";
      likeBtn.style.opacity = "0";
      likeBtn.style.transition = "opacity 0.2s";

      const imageContainer = item.querySelector(
        ".track-image, .playlist-image"
      );
      if (imageContainer) {
        imageContainer.style.position = "relative";
        imageContainer.appendChild(likeBtn);

        // Show like button on hover
        item.addEventListener("mouseenter", () => {
          likeBtn.style.opacity = "1";
        });

        item.addEventListener("mouseleave", () => {
          likeBtn.style.opacity = "0";
        });

        // Handle like button click
        likeBtn.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent triggering parent card click

          const title = item.querySelector("h3").textContent;
          const subtitle = item.querySelector("p").textContent;
          const thumbnail = item.querySelector("img").src;

          toggleFavorite(this, title, subtitle, thumbnail);
        });
      }
    }
  });

// Toggle favorite status
function toggleFavorite(button, title, subtitle, thumbnail) {
  const icon = button.querySelector("i");
  const isLiked = icon.classList.contains("fa-solid");

  if (isLiked) {
    // Remove from favorites
    icon.classList.remove("fa-solid", "heart-active");
    icon.classList.add("fa-regular");

    // Remove from favorites array
    favorites = favorites.filter((item) => item.title !== title);
  } else {
    // Add to favorites
    icon.classList.remove("fa-regular");
    icon.classList.add("fa-solid", "heart-active");

    // Add to favorites array
    favorites.push({ title, subtitle, thumbnail });
  }

  // Update favorites page
  updateFavoritesPage();
}

// Update the favorites page with current favorites
function updateFavoritesPage() {
  const favoritesPage = document.getElementById("liked-page");

  // Create the page if it doesn't exist
  if (!favoritesPage) {
    createFavoritesPage();
    return;
  }

  const contentSection = favoritesPage.querySelector(".content-section");

  // Clear current content
  contentSection.innerHTML = "";

  // Add header
  const header = document.createElement("h2");
  header.textContent = "Liked Songs";
  contentSection.appendChild(header);

  // Display favorites or empty message
  if (favorites.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "favorites-empty";
    emptyMessage.innerHTML = `
        <i class="fa-solid fa-heart-crack"></i>
        <p>You haven't liked any songs yet.</p>
        <p>Click the heart icon on songs you love.</p>
      `;
    contentSection.appendChild(emptyMessage);
  } else {
    // Create list of favorites
    const libraryList = document.createElement("div");
    libraryList.className = "library-list";

    favorites.forEach((fav) => {
      const item = document.createElement("div");
      item.className = "library-item";
      item.innerHTML = `
          <div class="item-image">
            <img src="${fav.thumbnail}" alt="${fav.title}">
          </div>
          <div class="item-info">
            <h3>${fav.title}</h3>
            <p>${fav.subtitle}</p>
          </div>
          <div class="item-actions">
            <button class="action-button remove-favorite">
              <i class="fa-solid fa-heart"></i>
            </button>
            <button class="action-button">
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        `;

      // Add remove functionality
      const removeBtn = item.querySelector(".remove-favorite");
      removeBtn.addEventListener("click", () => {
        favorites = favorites.filter((f) => f.title !== fav.title);
        updateFavoritesPage();

        // Also update the heart icons elsewhere
        document
          .querySelectorAll(".like-button, .card-like-button")
          .forEach((btn) => {
            const nearbyTitle = btn
              .closest(".track-card, .playlist-card, .now-playing")
              ?.querySelector("h3, h4")?.textContent;
            if (nearbyTitle === fav.title) {
              const icon = btn.querySelector("i");
              icon.className = "fa-regular fa-heart";
            }
          });
      });

      libraryList.appendChild(item);
    });

    contentSection.appendChild(libraryList);
  }
}

// Create the favorites page if it doesn't exist
function createFavoritesPage() {
  // Check if the page already exists
  if (document.getElementById("liked-page")) return;

  const page = document.createElement("div");
  page.id = "liked-page";
  page.className = "page";

  page.innerHTML = `
      <div class="page-header">
        <h1>Liked Songs</h1>
        <div class="header-actions">
          <button class="action-button">
            <i class="fa-solid fa-play"></i>
          </button>
          <button class="action-button">
            <i class="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
      <div class="content-section"></div>
    `;

  // Add to main content
  document.querySelector(".main-content").appendChild(page);

  // Update with current favorites
  updateFavoritesPage();
}

// Playlist functionality
function createPlaylistsPage() {
  // Check if the page already exists
  if (document.getElementById("playlists-page")) return;

  const page = document.createElement("div");
  page.id = "playlists-page";
  page.className = "page";

  page.innerHTML = `
      <div class="page-header">
        <h1>Your Playlists</h1>
        <div class="header-actions">
          <button class="create-playlist" id="create-playlist-btn">
            <i class="fa-solid fa-plus"></i>
            <span>Create Playlist</span>
          </button>
        </div>
      </div>
      <div class="content-section">
        <div class="playlist-header">
          <h2>Your Playlists</h2>
          <input type="file" id="playlist-image-upload" class="playlist-upload" accept="image/*">
        </div>
        <div class="playlist-grid">
          <!-- Default playlists -->
          <div class="playlist-card" data-playlist-id="favorites">
            <div class="playlist-image">
              <img src="https://via.placeholder.com/200/3b82f6/ffffff?text=Favorites" alt="Playlist Cover">
              <button class="play-button">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>
            <div class="playlist-info">
              <h3>Liked Songs</h3>
              <p>Your favorite tracks</p>
            </div>
          </div>
        </div>
      </div>
    `;

  // Add to main content
  document.querySelector(".main-content").appendChild(page);

  // Setup create playlist functionality
  const createBtn = page.querySelector("#create-playlist-btn");
  const imageUpload = page.querySelector("#playlist-image-upload");

  createBtn.addEventListener("click", () => {
    createNewPlaylist();
  });

  imageUpload.addEventListener("change", (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageUrl = event.target.result;
      const playlistName =
        localStorage.getItem("temp_playlist_name") || "My Playlist";
      localStorage.removeItem("temp_playlist_name");

      // Create new playlist with the image
      createPlaylist(playlistName, "Your custom playlist", imageUrl);
    };

    reader.readAsDataURL(file);
  });
}

// Add a new playlist card
function addPlaylistCard(title, description, imageUrl) {
  const playlistGrid = document.querySelector("#playlists-page .playlist-grid");

  const card = document.createElement("div");
  card.className = "playlist-card";

  card.innerHTML = `
      <div class="playlist-image">
        <img src="${
          imageUrl ||
          "https://via.placeholder.com/200/22d3ee/ffffff?text=Playlist"
        }" alt="${title}">
        <button class="play-button">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="playlist-info">
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    `;

  // Add like button
  const likeBtn = document.createElement("button");
  likeBtn.className = "card-like-button";
  likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  likeBtn.style.position = "absolute";
  likeBtn.style.top = "8px";
  likeBtn.style.right = "8px";
  likeBtn.style.background = "rgba(0, 0, 0, 0.5)";
  likeBtn.style.border = "none";
  likeBtn.style.borderRadius = "50%";
  likeBtn.style.width = "30px";
  likeBtn.style.height = "30px";
  likeBtn.style.display = "flex";
  likeBtn.style.alignItems = "center";
  likeBtn.style.justifyContent = "center";
  likeBtn.style.color = "white";
  likeBtn.style.cursor = "pointer";
  likeBtn.style.opacity = "0";
  likeBtn.style.transition = "opacity 0.2s";

  const imageContainer = card.querySelector(".playlist-image");
  imageContainer.style.position = "relative";
  imageContainer.appendChild(likeBtn);

  // Show like button on hover
  card.addEventListener("mouseenter", () => {
    likeBtn.style.opacity = "1";
  });

  card.addEventListener("mouseleave", () => {
    likeBtn.style.opacity = "0";
  });

  // Handle like button click
  likeBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    const title = card.querySelector("h3").textContent;
    const subtitle = card.querySelector("p").textContent;
    const thumbnail = card.querySelector("img").src;

    toggleFavorite(this, title, subtitle, thumbnail);
  });

  playlistGrid.appendChild(card);
}

// Initialize pages
createFavoritesPage();
createPlaylistsPage();

// Update the signup link in the original page
document.querySelector(".signup-section a").href = "#sign-up";

// Update the forgot password link
document.querySelector(".forgot-password a").href = "#forgot-password";
// Update the signup form submission handler
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;

  // Simple validation
  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Show loading state
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
  submitButton.disabled = true;

  // Simulate account creation (2 second delay)
  setTimeout(() => {
    // Hide the form and show confirmation
    signupForm.style.display = "none";
    document.getElementById("signup-confirmation").classList.remove("hidden");

    // Store the username for later use
    localStorage.setItem("soundstream_username", username);

    // Reset form for next time
    submitButton.innerHTML = "Sign Up";
    submitButton.disabled = false;
  }, 2000);
});

// Handle the "Get Started" button click
document.querySelector(".close-confirmation").addEventListener("click", () => {
  // Close the modal
  signupModal.style.display = "none";
  document.body.style.overflow = "";

  // Auto login with the new account
  const username = localStorage.getItem("soundstream_username") || "New User";
  userDisplay.textContent = username;
  loginContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");

  // Reset the modal for next time
  setTimeout(() => {
    signupForm.style.display = "block";
    document.getElementById("signup-confirmation").classList.add("hidden");
    signupForm.reset();
  }, 500);
});
// Sample songs with actual audio files
const songs = [
  {
    id: 1,
    title: "Sunny Day",
    artist: "Acoustic Dreams",
    duration: 174, // in seconds
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Electric Vibes",
    artist: "Synth Wave",
    duration: 213,
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Midnight Jazz",
    artist: "Smooth Quartet",
    duration: 198,
    cover:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Chill Beats",
    artist: "Lo-Fi Producer",
    duration: 165,
    cover:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Summer Groove",
    artist: "Beach Tunes",
    duration: 187,
    cover:
      "https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

// Function to format time (seconds to MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Audio player functionality
let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.querySelector(".play-pause");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");
const progressHandle = document.querySelector(".progress-handle");
const timeElapsed = document.querySelector(".time-elapsed");
const timeTotal = document.querySelector(".time-total");
const prevButton = document.querySelector(
  ".player-buttons .fa-backward"
).parentElement;
const nextButton = document.querySelector(
  ".player-buttons .fa-forward"
).parentElement;
const shuffleButton = document.querySelector(
  ".player-buttons .fa-shuffle"
).parentElement;
const repeatButton = document.querySelector(
  ".player-buttons .fa-repeat"
).parentElement;
const volumeSlider = document.querySelector(".volume-slider");
const volumeFill = document.querySelector(".volume-fill");

// Initialize the player with the first song
function initializePlayer() {
  loadSong(currentSongIndex);
  updateTrackGrid();
}

// Load a song into the player
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.audio;
  audioPlayer.load();

  // Update player UI
  document.querySelector(".now-playing .track-info h4").textContent =
    song.title;
  document.querySelector(".now-playing .track-info p").textContent =
    song.artist;
  document.querySelector(".track-thumbnail img").src = song.cover;

  // Update time display
  timeTotal.textContent = formatTime(song.duration);
  timeElapsed.textContent = "0:00";

  // Reset progress bar
  progressFill.style.width = "0%";
  progressHandle.style.left = "0%";

  // Update play/pause button
  if (isPlaying) {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audioPlayer.play();
  } else {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// Play/Pause toggle
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

// Previous song
prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
});

// Next song
nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
});

// Update progress as song plays
audioPlayer.addEventListener("timeupdate", () => {
  if (audioPlayer.duration) {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percent}%`;
    progressHandle.style.left = `${percent}%`;
    timeElapsed.textContent = formatTime(audioPlayer.currentTime);
  }
});

// Click on progress bar to seek
progressBar.addEventListener("click", function (e) {
  const rect = this.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Volume control
volumeSlider.addEventListener("click", function (e) {
  const rect = this.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.volume = percent;
  volumeFill.style.width = `${percent * 100}%`;
  volumeHandle.style.left = `${percent * 100}%`;
});

// When song ends, play next song
audioPlayer.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
});

// Create track grid with actual songs
function updateTrackGrid() {
  const trackGrid = document.querySelector(".track-grid");
  if (!trackGrid) return;

  // Clear existing tracks
  trackGrid.innerHTML = "";

  // Add each song to the grid
  songs.forEach((song, index) => {
    const trackCard = document.createElement("div");
    trackCard.className = "track-card";
    trackCard.innerHTML = `
        <div class="track-image">
          <img src="${song.cover}" alt="${song.title}">
          <button class="play-button">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <div class="track-info">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
        </div>
      `;

    // Add like button
    const likeBtn = document.createElement("button");
    likeBtn.className = "card-like-button";
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.style.position = "absolute";
    likeBtn.style.top = "8px";
    likeBtn.style.right = "8px";
    likeBtn.style.background = "rgba(0, 0, 0, 0.5)";
    likeBtn.style.border = "none";
    likeBtn.style.borderRadius = "50%";
    likeBtn.style.width = "30px";
    likeBtn.style.height = "30px";
    likeBtn.style.display = "flex";
    likeBtn.style.alignItems = "center";
    likeBtn.style.justifyContent = "center";
    likeBtn.style.color = "white";
    likeBtn.style.cursor = "pointer";
    likeBtn.style.opacity = "0";
    likeBtn.style.transition = "opacity 0.2s";

    const imageContainer = trackCard.querySelector(".track-image");
    imageContainer.style.position = "relative";
    imageContainer.appendChild(likeBtn);

    // Show like button on hover
    trackCard.addEventListener("mouseenter", () => {
      likeBtn.style.opacity = "1";
    });

    trackCard.addEventListener("mouseleave", () => {
      likeBtn.style.opacity = "0";
    });

    // Play this song when clicked
    trackCard.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      isPlaying = true;
      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    // Handle like button click
    likeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleFavorite(this, song.title, song.artist, song.cover);
    });

    trackGrid.appendChild(trackCard);
  });
}

// Initialize player when page loads
window.addEventListener("DOMContentLoaded", () => {
  // Initialize player after a short delay to ensure all elements are loaded
  setTimeout(initializePlayer, 500);
});
// Update the home page with our songs
function updateHomePage() {
  const recentlyPlayed = document.querySelector("#home-page .track-grid");
  if (!recentlyPlayed) return;

  // Clear existing content
  recentlyPlayed.innerHTML = "";

  // Add each song
  songs.forEach((song, index) => {
    const trackCard = document.createElement("div");
    trackCard.className = "track-card";
    trackCard.innerHTML = `
        <div class="track-image">
          <img src="${song.cover}" alt="${song.title}">
          <button class="play-button">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <div class="track-info">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
        </div>
      `;

    // Add like button
    const likeBtn = document.createElement("button");
    likeBtn.className = "card-like-button";
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.style.position = "absolute";
    likeBtn.style.top = "8px";
    likeBtn.style.right = "8px";
    likeBtn.style.background = "rgba(0, 0, 0, 0.5)";
    likeBtn.style.border = "none";
    likeBtn.style.borderRadius = "50%";
    likeBtn.style.width = "30px";
    likeBtn.style.height = "30px";
    likeBtn.style.display = "flex";
    likeBtn.style.alignItems = "center";
    likeBtn.style.justifyContent = "center";
    likeBtn.style.color = "white";
    likeBtn.style.cursor = "pointer";
    likeBtn.style.opacity = "0";
    likeBtn.style.transition = "opacity 0.2s";

    const imageContainer = trackCard.querySelector(".track-image");
    imageContainer.style.position = "relative";
    imageContainer.appendChild(likeBtn);

    // Show like button on hover
    trackCard.addEventListener("mouseenter", () => {
      likeBtn.style.opacity = "1";
    });

    trackCard.addEventListener("mouseleave", () => {
      likeBtn.style.opacity = "0";
    });

    // Play this song when clicked
    trackCard.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      isPlaying = true;
      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    // Handle like button click
    likeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleFavorite(this, song.title, song.artist, song.cover);
    });

    // Add "Add to Playlist" button
    const addToPlaylistBtn = document.createElement("button");
    addToPlaylistBtn.className = "add-to-playlist-button";
    addToPlaylistBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addToPlaylistBtn.style.position = "absolute";
    addToPlaylistBtn.style.top = "8px";
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

    imageContainer.appendChild(addToPlaylistBtn);

    // Handle add to playlist button click
    addToPlaylistBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showAddToPlaylistModal(song);
    });

    recentlyPlayed.appendChild(trackCard);
  });
}

// Call this function after the page loads
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(updateHomePage, 500);
});

// =============== PLAYLIST FEATURE IMPLEMENTATION ===============

// Playlist data structure
let playlists = JSON.parse(localStorage.getItem("soundstream_playlists")) || [];

// Create a new playlist modal
function createNewPlaylist() {
  // Create modal if it doesn't exist
  if (!document.getElementById("playlist-modal")) {
    const modal = document.createElement("div");
    modal.id = "playlist-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>Create New Playlist</h2>
            <button class="close-modal">&times;</button>
          </div>
          <form id="playlist-form">
            <div class="form-group">
              <label for="playlist-name">Playlist Name</label>
              <div class="input-container">
                <i class="fa-solid fa-music"></i>
                <input type="text" id="playlist-name" placeholder="Enter playlist name" required>
              </div>
            </div>
            <div class="form-group">
              <label for="playlist-description">Description</label>
              <div class="input-container">
                <i class="fa-solid fa-align-left"></i>
                <input type="text" id="playlist-description" placeholder="Enter playlist description">
              </div>
            </div>
            <div class="form-group">
              <label>Playlist Cover</label>
              <div class="playlist-cover-options">
                <div class="cover-option selected" style="background-color: #3b82f6;"></div>
                <div class="cover-option" style="background-color: #22d3ee;"></div>
                <div class="cover-option" style="background-color: #10b981;"></div>
                <div class="cover-option" style="background-color: #f59e0b;"></div>
                <div class="cover-option" style="background-color: #ef4444;"></div>
                <div class="cover-option" style="background-color: #8b5cf6;"></div>
                <div class="cover-option custom">
                  <i class="fa-solid fa-image"></i>
                </div>
              </div>
              <input type="file" id="custom-cover" class="hidden" accept="image/*">
            </div>
            <button type="submit" class="modal-button">Create Playlist</button>
          </form>
        </div>
      `;
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Cover options
    const coverOptions = modal.querySelectorAll(".cover-option");
    coverOptions.forEach((option) => {
      option.addEventListener("click", () => {
        coverOptions.forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");

        if (option.classList.contains("custom")) {
          document.getElementById("custom-cover").click();
        }
      });
    });

    // Custom cover upload
    const customCoverInput = document.getElementById("custom-cover");
    customCoverInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const customOption = document.querySelector(".cover-option.custom");
          customOption.style.backgroundImage = `url(${event.target.result})`;
          customOption.style.backgroundSize = "cover";
          customOption.style.backgroundPosition = "center";
          customOption.innerHTML = "";
        };

        reader.readAsDataURL(file);
      }
    });

    // Form submission
    const playlistForm = document.getElementById("playlist-form");
    playlistForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("playlist-name").value;
      const description =
        document.getElementById("playlist-description").value ||
        "My custom playlist";

      let coverImage;
      const selectedCover = document.querySelector(".cover-option.selected");

      if (
        selectedCover.classList.contains("custom") &&
        selectedCover.style.backgroundImage
      ) {
        coverImage = selectedCover.style.backgroundImage.slice(5, -2); // Extract URL from url()
      } else {
        // Generate a placeholder with the background color
        const bgColor = selectedCover.style.backgroundColor;
        const colorCode = bgColor.replace(/[^0-9A-F]/gi, "");
        coverImage = `https://via.placeholder.com/200/${colorCode}/ffffff?text=${encodeURIComponent(
          name
        )}`;
      }

      // Create the playlist
      createPlaylist(name, description, coverImage);

      // Close modal
      modal.style.display = "none";
      document.body.style.overflow = "";

      // Reset form
      playlistForm.reset();
      document.querySelectorAll(".cover-option").forEach((opt, index) => {
        if (index === 0) opt.classList.add("selected");
        else opt.classList.remove("selected");
      });

      const customOption = document.querySelector(".cover-option.custom");
      customOption.style.backgroundImage = "";
      customOption.innerHTML = '<i class="fa-solid fa-image"></i>';
    });
  }

  // Show the modal
  const modal = document.getElementById("playlist-modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Create a playlist
function createPlaylist(name, description, coverImage) {
  const playlistId = "playlist_" + Date.now();

  const newPlaylist = {
    id: playlistId,
    name: name,
    description: description,
    coverImage: coverImage,
    songs: [],
    createdAt: new Date().toISOString(),
  };

  // Add to playlists array
  playlists.push(newPlaylist);

  // Save to localStorage
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

  // Add to UI
  addPlaylistToUI(newPlaylist);

  // Show success notification
  showNotification(`Playlist "${name}" created successfully!`);

  // Navigate to playlists page
  const playlistsNavItem = document.querySelector(
    '.nav-item[data-page="playlists"]'
  );
  if (playlistsNavItem) {
    playlistsNavItem.click();
  }
}

// Add playlist to UI
function addPlaylistToUI(playlist) {
  const playlistGrid = document.querySelector("#playlists-page .playlist-grid");
  if (!playlistGrid) return;

  const playlistCard = document.createElement("div");
  playlistCard.className = "playlist-card";
  playlistCard.dataset.playlistId = playlist.id;

  playlistCard.innerHTML = `
      <div class="playlist-image">
        <img src="${playlist.coverImage}" alt="${playlist.name}">
        <button class="play-button">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="playlist-info">
        <h3>${playlist.name}</h3>
        <p>${playlist.description}</p>
      </div>
    `;

  // Add event listener to open playlist
  playlistCard.addEventListener("click", () => {
    openPlaylistDetail(playlist.id);
  });

  // Add options button
  const optionsBtn = document.createElement("button");
  optionsBtn.className = "playlist-options-button";
  optionsBtn.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';
  optionsBtn.style.position = "absolute";
  optionsBtn.style.top = "8px";
  optionsBtn.style.right = "8px";
  optionsBtn.style.background = "rgba(0, 0, 0, 0.5)";
  optionsBtn.style.border = "none";
  optionsBtn.style.borderRadius = "50%";
  optionsBtn.style.width = "30px";
  optionsBtn.style.height = "30px";
  optionsBtn.style.display = "flex";
  optionsBtn.style.alignItems = "center";
  optionsBtn.style.justifyContent = "center";
  optionsBtn.style.color = "white";
  optionsBtn.style.cursor = "pointer";
  optionsBtn.style.opacity = "0";
  optionsBtn.style.transition = "opacity 0.2s";

  const imageContainer = playlistCard.querySelector(".playlist-image");
  imageContainer.style.position = "relative";
  imageContainer.appendChild(optionsBtn);

  // Show options button on hover
  playlistCard.addEventListener("mouseenter", () => {
    optionsBtn.style.opacity = "1";
  });

  playlistCard.addEventListener("mouseleave", () => {
    optionsBtn.style.opacity = "0";
  });

  // Handle options button click
  optionsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPlaylistOptions(playlist.id, optionsBtn);
  });

  playlistGrid.appendChild(playlistCard);
}

// Show playlist options menu
function showPlaylistOptions(playlistId, buttonElement) {
  // Remove any existing options menu
  const existingMenu = document.querySelector(".playlist-options-menu");
  if (existingMenu) {
    existingMenu.remove();
  }

  // Create options menu
  const optionsMenu = document.createElement("div");
  optionsMenu.className = "playlist-options-menu";
  optionsMenu.innerHTML = `
      <ul>
        <li class="edit-playlist"><i class="fa-solid fa-pen"></i> Edit playlist</li>
        <li class="delete-playlist"><i class="fa-solid fa-trash"></i> Delete playlist</li>
      </ul>
    `;

  // Position the menu
  const buttonRect = buttonElement.getBoundingClientRect();
  optionsMenu.style.position = "fixed";
  optionsMenu.style.top = `${buttonRect.bottom + 5}px`;
  optionsMenu.style.left = `${buttonRect.left - 120}px`;
  optionsMenu.style.width = "150px";
  optionsMenu.style.backgroundColor = "rgba(30, 30, 30, 0.95)";
  optionsMenu.style.borderRadius = "8px";
  optionsMenu.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  optionsMenu.style.zIndex = "1000";
  optionsMenu.style.overflow = "hidden";

  // Style the list
  const menuList = optionsMenu.querySelector("ul");
  menuList.style.listStyle = "none";
  menuList.style.padding = "0";
  menuList.style.margin = "0";

  // Style the list items
  const menuItems = optionsMenu.querySelectorAll("li");
  menuItems.forEach((item) => {
    item.style.padding = "10px 15px";
    item.style.cursor = "pointer";
    item.style.transition = "background-color 0.2s";
    item.style.color = "white";
    item.style.fontSize = "14px";

    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    });

    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = "transparent";
    });
  });

  // Add event listeners
  optionsMenu.querySelector(".edit-playlist").addEventListener("click", () => {
    editPlaylist(playlistId);
    optionsMenu.remove();
  });

  optionsMenu
    .querySelector(".delete-playlist")
    .addEventListener("click", () => {
      deletePlaylist(playlistId);
      optionsMenu.remove();
    });

  // Close menu when clicking outside
  document.addEventListener("click", function closeMenu(e) {
    if (!optionsMenu.contains(e.target) && e.target !== buttonElement) {
      optionsMenu.remove();
      document.removeEventListener("click", closeMenu);
    }
  });

  // Add to DOM
  document.body.appendChild(optionsMenu);
}

// Edit playlist
function editPlaylist(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  // Create edit modal if it doesn't exist
  if (!document.getElementById("edit-playlist-modal")) {
    const modal = document.createElement("div");
    modal.id = "edit-playlist-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Playlist</h2>
            <button class="close-modal">&times;</button>
          </div>
          <form id="edit-playlist-form">
            <input type="hidden" id="edit-playlist-id">
            <div class="form-group">
              <label for="edit-playlist-name">Playlist Name</label>
              <div class="input-container">
                <i class="fa-solid fa-music"></i>
                <input type="text" id="edit-playlist-name" placeholder="Enter playlist name" required>
              </div>
            </div>
            <div class="form-group">
              <label for="edit-playlist-description">Description</label>
              <div class="input-container">
                <i class="fa-solid fa-align-left"></i>
                <input type="text" id="edit-playlist-description" placeholder="Enter playlist description">
              </div>
            </div>
            <div class="form-group">
              <label>Playlist Cover</label>
              <div class="edit-cover-preview">
                <img id="edit-cover-image" src="/placeholder.svg" alt="Playlist Cover">
                <button type="button" id="change-cover-btn" class="modal-button">Change Cover</button>
              </div>
              <input type="file" id="edit-custom-cover" class="hidden" accept="image/*">
            </div>
            <button type="submit" class="modal-button">Save Changes</button>
          </form>
        </div>
      `;
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Change cover button
    const changeCoverBtn = document.getElementById("change-cover-btn");
    changeCoverBtn.addEventListener("click", () => {
      document.getElementById("edit-custom-cover").click();
    });

    // Custom cover upload
    const editCoverInput = document.getElementById("edit-custom-cover");
    editCoverInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          document.getElementById("edit-cover-image").src = event.target.result;
        };

        reader.readAsDataURL(file);
      }
    });

    // Form submission
    const editForm = document.getElementById("edit-playlist-form");
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const playlistId = document.getElementById("edit-playlist-id").value;
      const name = document.getElementById("edit-playlist-name").value;
      const description = document.getElementById(
        "edit-playlist-description"
      ).value;
      const coverImage = document.getElementById("edit-cover-image").src;

      // Update playlist
      updatePlaylist(playlistId, name, description, coverImage);

      // Close modal
      modal.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // Populate form with playlist data
  document.getElementById("edit-playlist-id").value = playlist.id;
  document.getElementById("edit-playlist-name").value = playlist.name;
  document.getElementById("edit-playlist-description").value =
    playlist.description;
  document.getElementById("edit-cover-image").src = playlist.coverImage;

  // Show the modal
  const modal = document.getElementById("edit-playlist-modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Update playlist
function updatePlaylist(playlistId, name, description, coverImage) {
  // Find playlist in array
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);
  if (playlistIndex === -1) return;

  // Update playlist data
  playlists[playlistIndex].name = name;
  playlists[playlistIndex].description = description;
  playlists[playlistIndex].coverImage = coverImage;

  // Save to localStorage
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

  // Update UI
  const playlistCard = document.querySelector(
    `.playlist-card[data-playlist-id="${playlistId}"]`
  );
  if (playlistCard) {
    playlistCard.querySelector("img").src = coverImage;
    playlistCard.querySelector("h3").textContent = name;
    playlistCard.querySelector("p").textContent = description;
  }

  // Update playlist detail page if open
  const detailPage = document.getElementById(`playlist-detail-${playlistId}`);
  if (detailPage) {
    detailPage.querySelector("h1").textContent = name;
    detailPage.querySelector(".playlist-detail-header img").src = coverImage;
    detailPage.querySelector(".playlist-detail-info p").textContent =
      description;
  }

  // Show success notification
  showNotification(`Playlist "${name}" updated successfully!`);
}

// Delete playlist
function deletePlaylist(playlistId) {
  // Find playlist
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  // Create confirmation modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>Delete Playlist</h2>
          <button class="close-modal">&times;</button>
        </div>
        <div style="padding: 1.5rem;">
          <p style="margin-bottom: 1.5rem; color: white;">Are you sure you want to delete the playlist "${playlist.name}"? This action cannot be undone.</p>
          <div style="display: flex; gap: 1rem;">
            <button id="cancel-delete" class="modal-button" style="background: rgba(255, 255, 255, 0.2);">Cancel</button>
            <button id="confirm-delete" class="modal-button" style="background: #ef4444;">Delete</button>
          </div>
        </div>
      </div>
    `;
  document.body.appendChild(modal);

  // Add event listeners
  const closeBtn = modal.querySelector(".close-modal");
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  document.getElementById("cancel-delete").addEventListener("click", () => {
    modal.remove();
  });

  document.getElementById("confirm-delete").addEventListener("click", () => {
    // Remove from playlists array
    playlists = playlists.filter((p) => p.id !== playlistId);

    // Save to localStorage
    localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

    // Remove from UI
    const playlistCard = document.querySelector(
      `.playlist-card[data-playlist-id="${playlistId}"]`
    );
    if (playlistCard) {
      playlistCard.remove();
    }

    // Close detail page if open
    const detailPage = document.getElementById(`playlist-detail-${playlistId}`);
    if (detailPage) {
      detailPage.remove();
      // Navigate to playlists page
      const playlistsNavItem = document.querySelector(
        '.nav-item[data-page="playlists"]'
      );
      if (playlistsNavItem) {
        playlistsNavItem.click();
      }
    }

    // Show notification
    showNotification(`Playlist "${playlist.name}" deleted successfully!`);

    // Close modal
    modal.remove();
  });

  // Show modal
  modal.style.display = "block";
}

// Open playlist detail
function openPlaylistDetail(playlistId) {
  const playlist = playlists.find((p) => p.id === playlistId);
  if (!playlist) return;

  // Check if detail page already exists
  let detailPage = document.getElementById(`playlist-detail-${playlistId}`);

  if (!detailPage) {
    // Create detail page
    detailPage = document.createElement("div");
    detailPage.id = `playlist-detail-${playlistId}`;
    detailPage.className = "page";
    detailPage.innerHTML = `
        <div class="playlist-detail-header">
          <div class="back-button">
            <i class="fa-solid fa-arrow-left"></i>
          </div>
          <div class="playlist-detail-cover">
            <img src="${playlist.coverImage}" alt="${playlist.name}">
          </div>
          <div class="playlist-detail-info">
            <h1>${playlist.name}</h1>
            <p>${playlist.description}</p>
            <div class="playlist-stats">
              <span>${playlist.songs.length} songs</span>
              <span>•</span>
              <span>Created ${formatDate(playlist.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <div class="playlist-actions">
          <button class="play-all-button">
            <i class="fa-solid fa-play"></i> Play All
          </button>
          <button class="shuffle-button">
            <i class="fa-solid fa-shuffle"></i> Shuffle
          </button>
          <button class="edit-playlist-button">
            <i class="fa-solid fa-pen"></i> Edit
          </button>
        </div>
        
        <div class="playlist-songs">
          <div class="playlist-table-header">
            <div class="song-number">#</div>
            <div class="song-info">Title</div>
            <div class="song-artist">Artist</div>
            <div class="song-duration">Duration</div>
            <div class="song-actions"></div>
          </div>
          <div class="playlist-songs-list" id="playlist-songs-${playlistId}">
            ${
              playlist.songs.length === 0
                ? `<div class="empty-playlist">
                <i class="fa-solid fa-music"></i>
                <p>This playlist is empty</p>
                <p>Add songs from your library or search for new music</p>
              </div>`
                : ""
            }
          </div>
        </div>
      `;

    // Add to main content
    document.querySelector(".main-content").appendChild(detailPage);

    // Add event listeners
    detailPage.querySelector(".back-button").addEventListener("click", () => {
      // Hide detail page
      detailPage.classList.remove("active");

      // Show playlists page
      document.getElementById("playlists-page").classList.add("active");

      // Update nav
      document
        .querySelectorAll(".nav-item")
        .forEach((item) => item.classList.remove("active"));
      document
        .querySelector('.nav-item[data-page="playlists"]')
        .classList.add("active");
    });

    // Play all button
    detailPage
      .querySelector(".play-all-button")
      .addEventListener("click", () => {
        if (playlist.songs.length === 0) {
          showNotification("This playlist is empty");
          return;
        }

        // Play the first song in the playlist
        playPlaylistSong(playlist, 0);
      });

    // Shuffle button
    detailPage
      .querySelector(".shuffle-button")
      .addEventListener("click", () => {
        if (playlist.songs.length === 0) {
          showNotification("This playlist is empty");
          return;
        }

        // Play a random song from the playlist
        const randomIndex = Math.floor(Math.random() * playlist.songs.length);
        playPlaylistSong(playlist, randomIndex);
      });

    // Edit button
    detailPage
      .querySelector(".edit-playlist-button")
      .addEventListener("click", () => {
        editPlaylist(playlistId);
      });

    // Populate songs
    updatePlaylistSongs(playlist);
  }

  // Show detail page
  document
    .querySelectorAll(".page")
    .forEach((page) => page.classList.remove("active"));
  detailPage.classList.add("active");
}

// Update playlist songs
function updatePlaylistSongs(playlist) {
  const songsContainer = document.getElementById(
    `playlist-songs-${playlist.id}`
  );
  if (!songsContainer) return;

  // Clear container
  songsContainer.innerHTML = "";

  if (playlist.songs.length === 0) {
    songsContainer.innerHTML = `
        <div class="empty-playlist">
          <i class="fa-solid fa-music"></i>
          <p>This playlist is empty</p>
          <p>Add songs from your library or search for new music</p>
        </div>
      `;
    return;
  }

  // Add each song
  playlist.songs.forEach((songId, index) => {
    const song = songs.find((s) => s.id === songId);
    if (!song) return;

    const songElement = document.createElement("div");
    songElement.className = "playlist-song-item";
    songElement.dataset.songIndex = index;
    songElement.dataset.songId = song.id;
    songElement.innerHTML = `
        <div class="song-number">${index + 1}</div>
        <div class="song-info">
          <div class="song-image">
            <img src="${song.cover}" alt="${song.title}">
          </div>
          <div class="song-title">${song.title}</div>
        </div>
        <div class="song-artist">${song.artist}</div>
        <div class="song-duration">${formatTime(song.duration)}</div>
        <div class="song-actions">
          <button class="song-action-button play-song">
            <i class="fa-solid fa-play"></i>
          </button>
          <button class="song-action-button remove-song">
            <i class="fa-solid fa-times"></i>
          </button>
          <button class="song-action-button drag-handle">
            <i class="fa-solid fa-grip-lines"></i>
          </button>
        </div>
      `;

    // Play song
    songElement.querySelector(".play-song").addEventListener("click", () => {
      playPlaylistSong(playlist, index);
    });

    // Remove song
    songElement.querySelector(".remove-song").addEventListener("click", () => {
      removeSongFromPlaylist(playlist.id, song.id);
    });

    songsContainer.appendChild(songElement);
  });

  // Make songs draggable for reordering
  makePlaylistSongsDraggable(playlist.id);
}

// Play a song from a playlist
function playPlaylistSong(playlist, index) {
  if (index >= playlist.songs.length) return;

  const songId = playlist.songs[index];
  const songIndex = songs.findIndex((s) => s.id === songId);

  if (songIndex !== -1) {
    currentSongIndex = songIndex;
    loadSong(currentSongIndex);
    isPlaying = true;
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

// Remove song from playlist
function removeSongFromPlaylist(playlistId, songId) {
  // Find playlist
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);
  if (playlistIndex === -1) return;

  // Remove song
  playlists[playlistIndex].songs = playlists[playlistIndex].songs.filter(
    (id) => id !== songId
  );

  // Save to localStorage
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

  // Update UI
  updatePlaylistSongs(playlists[playlistIndex]);

  // Show notification
  const song = songs.find((s) => s.id === songId);
  showNotification(`Removed "${song ? song.title : "song"}" from playlist`);
}

// Make playlist songs draggable for reordering
function makePlaylistSongsDraggable(playlistId) {
  const songsContainer = document.getElementById(
    `playlist-songs-${playlistId}`
  );
  if (!songsContainer) return;

  const songItems = songsContainer.querySelectorAll(".playlist-song-item");

  songItems.forEach((item) => {
    const dragHandle = item.querySelector(".drag-handle");

    dragHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();

      // Add dragging class
      item.classList.add("dragging");

      // Get initial position
      const initialY = e.clientY;
      const initialIndex = Array.from(songItems).indexOf(item);

      // Create function to handle mouse move
      const handleMouseMove = (e) => {
        const currentY = e.clientY;
        const deltaY = currentY - initialY;

        // Move the element
        item.style.transform = `translateY(${deltaY}px)`;

        // Find new position
        const itemHeight = item.offsetHeight;
        const newIndex = Math.max(
          0,
          Math.min(
            Math.floor(initialIndex + deltaY / itemHeight),
            songItems.length - 1
          )
        );

        // Highlight drop position
        songItems.forEach((songItem, idx) => {
          if (idx === newIndex && idx !== initialIndex) {
            songItem.classList.add("drop-target");
          } else {
            songItem.classList.remove("drop-target");
          }
        });
      };

      // Create function to handle mouse up
      const handleMouseUp = () => {
        // Remove dragging class
        item.classList.remove("dragging");
        item.style.transform = "";

        // Find drop target
        const dropTarget = document.querySelector(
          ".playlist-song-item.drop-target"
        );
        if (dropTarget) {
          const fromIndex = Number.parseInt(item.dataset.songIndex);
          const toIndex = Number.parseInt(dropTarget.dataset.songIndex);

          // Reorder songs in the playlist
          reorderPlaylistSongs(playlistId, fromIndex, toIndex);

          dropTarget.classList.remove("drop-target");
        }

        // Remove event listeners
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      // Add event listeners
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });
  });
}

// Reorder songs in a playlist
function reorderPlaylistSongs(playlistId, fromIndex, toIndex) {
  // Find playlist
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);
  if (playlistIndex === -1) return;

  // Get the playlist
  const playlist = playlists[playlistIndex];

  // Move the song
  const [movedSong] = playlist.songs.splice(fromIndex, 1);
  playlist.songs.splice(toIndex, 0, movedSong);

  // Save to localStorage
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

  // Update UI
  updatePlaylistSongs(playlist);
}

// Show "Add to Playlist" modal
function showAddToPlaylistModal(song) {
  // Create modal if it doesn't exist
  if (!document.getElementById("add-to-playlist-modal")) {
    const modal = document.createElement("div");
    modal.id = "add-to-playlist-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <h2>Add to Playlist</h2>
            <button class="close-modal">&times;</button>
          </div>
          <div class="add-to-playlist-content">
            <div class="selected-song">
              <div class="selected-song-image">
                <img id="selected-song-cover" src="/placeholder.svg" alt="Song Cover">
              </div>
              <div class="selected-song-info">
                <h3 id="selected-song-title"></h3>
                <p id="selected-song-artist"></p>
              </div>
            </div>
            
            <div class="playlist-selection">
              <h3>Select a playlist</h3>
              <div id="playlist-selection-list"></div>
            </div>
            
            <div class="no-playlists hidden">
              <p>You don't have any playlists yet.</p>
              <button id="create-new-playlist-btn" class="modal-button">Create New Playlist</button>
            </div>
          </div>
        </div>
      `;
    document.body.appendChild(modal);

    // Add event listeners
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "";
    });

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Create new playlist button
    document
      .getElementById("create-new-playlist-btn")
      .addEventListener("click", () => {
        // Close this modal
        modal.style.display = "none";

        // Open create playlist modal
        createNewPlaylist();

        // Store the song ID to add after playlist creation
        localStorage.setItem(
          "song_to_add",
          JSON.stringify({
            id: document.getElementById("selected-song-id").value,
            title: document.getElementById("selected-song-title").textContent,
            artist: document.getElementById("selected-song-artist").textContent,
          })
        );
      });
  }

  // Update modal with song info
  document.getElementById("selected-song-cover").src = song.cover;
  document.getElementById("selected-song-title").textContent = song.title;
  document.getElementById("selected-song-artist").textContent = song.artist;

  // Add hidden input for song ID
  if (!document.getElementById("selected-song-id")) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.id = "selected-song-id";
    document.querySelector(".selected-song-info").appendChild(hiddenInput);
  }
  document.getElementById("selected-song-id").value = song.id;

  // Populate playlists
  const playlistList = document.getElementById("playlist-selection-list");
  playlistList.innerHTML = "";

  if (playlists.length === 0) {
    document.querySelector(".playlist-selection").classList.add("hidden");
    document.querySelector(".no-playlists").classList.remove("hidden");
  } else {
    document.querySelector(".playlist-selection").classList.remove("hidden");
    document.querySelector(".no-playlists").classList.add("hidden");

    playlists.forEach((playlist) => {
      const playlistItem = document.createElement("div");
      playlistItem.className = "playlist-selection-item";
      playlistItem.innerHTML = `
          <div class="playlist-selection-image">
            <img src="${playlist.coverImage}" alt="${playlist.name}">
          </div>
          <div class="playlist-selection-info">
            <h4>${playlist.name}</h4>
            <p>${playlist.songs.length} songs</p>
          </div>
        `;

      // Check if song is already in playlist
      const songInPlaylist = playlist.songs.includes(song.id);

      if (songInPlaylist) {
        const badge = document.createElement("div");
        badge.className = "in-playlist-badge";
        badge.innerHTML = '<i class="fa-solid fa-check"></i>';
        badge.style.backgroundColor = "#10b981";
        badge.style.color = "white";
        badge.style.width = "24px";
        badge.style.height = "24px";
        badge.style.borderRadius = "50%";
        badge.style.display = "flex";
        badge.style.alignItems = "center";
        badge.style.justifyContent = "center";
        playlistItem.appendChild(badge);
      }

      // Add to playlist on click
      playlistItem.addEventListener("click", () => {
        if (songInPlaylist) {
          // Remove from playlist
          removeSongFromPlaylist(playlist.id, song.id);

          // Close modal
          document.getElementById("add-to-playlist-modal").style.display =
            "none";
          document.body.style.overflow = "";

          // Show notification
          showNotification(`Removed "${song.title}" from "${playlist.name}"`);
        } else {
          // Add to playlist
          addSongToPlaylist(playlist.id, song.id);

          // Close modal
          document.getElementById("add-to-playlist-modal").style.display =
            "none";
          document.body.style.overflow = "";

          // Show notification
          showNotification(`Added "${song.title}" to "${playlist.name}"`);
        }
      });

      playlistList.appendChild(playlistItem);
    });
  }

  // Show modal
  const modal = document.getElementById("add-to-playlist-modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Add song to playlist
function addSongToPlaylist(playlistId, songId) {
  // Find playlist
  const playlistIndex = playlists.findIndex((p) => p.id === playlistId);
  if (playlistIndex === -1) return;

  // Check if song is already in playlist
  if (playlists[playlistIndex].songs.includes(songId)) {
    return;
  }

  // Add song to playlist
  playlists[playlistIndex].songs.push(songId);

  // Save to localStorage
  localStorage.setItem("soundstream_playlists", JSON.stringify(playlists));

  // Update UI if playlist detail is open
  const detailPage = document.getElementById(`playlist-detail-${playlistId}`);
  if (detailPage && detailPage.classList.contains("active")) {
    updatePlaylistSongs(playlists[playlistIndex]);
  }
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Show notification
function showNotification(message) {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = message;

  // Style notification
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "rgba(30, 30, 30, 0.9)";
  notification.style.color = "white";
  notification.style.padding = "12px 20px";
  notification.style.borderRadius = "8px";
  notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeInUp 0.3s, fadeOut 0.3s 2.7s";

  // Add to DOM
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Load playlists on page load
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    // Load playlists from localStorage
    playlists = JSON.parse(localStorage.getItem("soundstream_playlists")) || [];

    // Add playlists to UI
    const playlistGrid = document.querySelector(
      "#playlists-page .playlist-grid"
    );
    if (playlistGrid) {
      // Clear existing playlists except the default one
      const defaultPlaylist = playlistGrid.querySelector(
        '.playlist-card[data-playlist-id="favorites"]'
      );
      playlistGrid.innerHTML = "";
      if (defaultPlaylist) {
        playlistGrid.appendChild(defaultPlaylist);
      }

      // Add each playlist
      playlists.forEach((playlist) => {
        addPlaylistToUI(playlist);
      });
    }

    // Check if there's a song to add to a newly created playlist
    const songToAdd = localStorage.getItem("song_to_add");
    if (songToAdd) {
      const songData = JSON.parse(songToAdd);

      // If we have playlists and a song to add
      if (playlists.length > 0 && songData) {
        // Add to the most recently created playlist
        const latestPlaylist = playlists[playlists.length - 1];
        addSongToPlaylist(latestPlaylist.id, songData.id);

        // Show notification
        showNotification(
          `Added "${songData.title}" to "${latestPlaylist.name}"`
        );
      }

      // Clear the stored song
      localStorage.removeItem("song_to_add");
    }
  }, 500);
});

// Add CSS for playlist features
const playlistStyles = document.createElement("style");
playlistStyles.textContent = `
    /* Playlist Detail Styles */
    .playlist-detail-header {
      display: flex;
      align-items: center;
      padding: 2rem;
      background: linear-gradient(to bottom, rgba(59, 130, 246, 0.7), rgba(0, 0, 0, 0));
    }
    
    .back-button {
      width: 36px;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 1.5rem;
      color: white;
      transition: all 0.2s;
    }
    
    .back-button:hover {
      background-color: rgba(0, 0, 0, 0.7);
      transform: scale(1.1);
    }
    
    .playlist-detail-cover {
      width: 180px;
      height: 180px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      margin-right: 2rem;
    }
    
    .playlist-detail-cover img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .playlist-detail-info {
      flex: 1;
    }
    
    .playlist-detail-info h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
    }
    
    .playlist-detail-info p {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
    }
    
    .playlist-stats {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
    }
    
    .playlist-actions {
      display: flex;
      gap: 1rem;
      padding: 0 2rem 1.5rem;
    }
    
    .play-all-button {
      background: linear-gradient(to right, #3b82f6, #22d3ee);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    
    .play-all-button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .shuffle-button, .edit-playlist-button {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 30px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s;
    }
    
    .shuffle-button:hover, .edit-playlist-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .playlist-songs {
      padding: 0 2rem 2rem;
    }
    
    .playlist-table-header {
      display: grid;
      grid-template-columns: 50px 3fr 2fr 1fr 80px;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .playlist-song-item {
      display: grid;
      grid-template-columns: 50px 3fr 2fr 1fr 80px;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      align-items: center;
      transition: background-color 0.2s;
      cursor: pointer;
      position: relative;
    }
    
    .playlist-song-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .playlist-song-item.dragging {
      opacity: 0.5;
      z-index: 10;
    }
    
    .playlist-song-item.drop-target {
      border-top: 2px solid #3b82f6;
    }
    
    .song-number {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.875rem;
    }
    
    .song-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .song-image {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .song-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .song-title {
      font-weight: 500;
    }
    
    .song-artist {
      color: rgba(255, 255, 255, 0.7);
    }
    
    .song-duration {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
    }
    
    .song-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }
    
    .song-action-button {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .song-action-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .empty-playlist {
      text-align: center;
      padding: 3rem 0;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .empty-playlist i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
    
    /* Create Playlist Modal Styles */
    .playlist-cover-options {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    
    .cover-option {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .cover-option:hover {
      transform: scale(1.1);
    }
    
    .cover-option.selected {
      border: 2px solid white;
      transform: scale(1.1);
    }
    
    .cover-option.custom {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.5rem;
    }
    
    /* Edit Cover Preview */
    .edit-cover-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    .edit-cover-preview img {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      object-fit: cover;
    }
    
    /* Add to Playlist Modal */
    .selected-song {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .selected-song-image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .selected-song-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .selected-song-info h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .selected-song-info p {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .playlist-selection {
      padding: 1rem 1.5rem;
    }
    
    .playlist-selection h3 {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .playlist-selection-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .playlist-selection-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s;
      position: relative;
    }
    
    .playlist-selection-item:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .playlist-selection-image {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .playlist-selection-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .playlist-selection-info {
      flex: 1;
    }
    
    .playlist-selection-info h4 {
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .playlist-selection-info p {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .no-playlists {
      padding: 2rem 1.5rem;
      text-align: center;
    }
    
    .no-playlists p {
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    /* Notification */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;

document.head.appendChild(playlistStyles);

// In script.js, make sure these variables are globally accessible
window.userDisplay = document.getElementById("user-display");
window.loginContainer = document.getElementById("login-container");
window.appContainer = document.getElementById("app");
