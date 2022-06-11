const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  const outlineLength = outline.getTotalLength();
  //duration
  let fakeduration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      if (song.paused) {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
      } else {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
      }
    });
  });

  //play sound
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select time
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
      fakeduration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeduration / 60)}:${Math.floor(
        fakeduration % 60
      )}`.padStart(4, "0");
    });
  });

  //create a function to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //time elapsed
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeduration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate the circle
    let progress = outlineLength - (currentTime / fakeduration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`.padStart(4, "0");

    if (currentTime >= fakeduration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
      song.src = "./sounds/alarm.mp3";
      song.play();
    }
  };
};

app();
