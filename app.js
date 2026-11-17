document.querySelectorAll(".no").forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "TRY YES!";
    button.style.transform = "translate(" + (Math.random() * 34 - 17) + "px, " + (Math.random() * 16 - 8) + "px)";
  });
});

(() => {
  const positionKey = "birthdayMusicPosition";
  const music = new Audio("background-music.mp3");
  music.autoplay = true;
  music.loop = true;
  music.preload = "auto";
  music.volume = 0.35;

  let savedPosition = 0;
  let positionRestored = false;
  let isPlaying = false;

  try {
    savedPosition = Number(sessionStorage.getItem(positionKey)) || 0;
  } catch {
    // Playback still works if storage is unavailable.
  }

  const restorePosition = () => {
    if (positionRestored || music.readyState === 0) return;
    positionRestored = true;
    if (savedPosition > 0 && Number.isFinite(music.duration) && music.duration > 0) {
      music.currentTime = savedPosition % music.duration;
    }
  };

  const savePosition = () => {
    if (music.readyState === 0) return;
    try {
      sessionStorage.setItem(positionKey, String(music.currentTime));
    } catch {
      // Playback continues if storage is unavailable.
    }
  };

  const interactionEvents = ["pointerdown", "keydown", "touchstart"];
  const startMusic = () => {
    restorePosition();
    music.play().catch(() => {});
  };
  const startOnInteraction = () => {
    if (!isPlaying) startMusic();
  };
  const removeInteractionListeners = () => {
    interactionEvents.forEach((eventName) => {
      document.removeEventListener(eventName, startOnInteraction, true);
    });
  };

  music.addEventListener("loadedmetadata", restorePosition, { once: true });
  music.addEventListener("playing", () => {
    isPlaying = true;
    removeInteractionListeners();
  });
  music.addEventListener("timeupdate", savePosition);
  window.addEventListener("pagehide", savePosition);
  interactionEvents.forEach((eventName) => {
    document.addEventListener(eventName, startOnInteraction, true);
  });

  startMusic();
})();
