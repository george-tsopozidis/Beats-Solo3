let video;
let durationControl;
let soundControl;
let intervalId;

document.addEventListener("DOMContentLoaded", (e) => {
  video = document.getElementById("video");

  // вешаем обработчик события на на тег video
  video.addEventListener("click", playStop);

  // находим все кнопки play и навешиваем через цикл на каждую обработчик
  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", playStop);
  }

  // обработчик событий на кнопку динамик
  let micControl = document.getElementById("micLevel");
  micControl.addEventListener("click", soundOf);

  // обработчики события для ползунка продолжительности видео
  durationControl = document.getElementById("durationLevel");
  durationControl.addEventListener("mousedown", stopInterval);
  durationControl.addEventListener("click", setVideoDuration);

  durationControl.min = 0;
  durationControl.value = 0;

  // обработчики события для ползунка громоксти
  soundControl = document.getElementById("volumeLevel");
  soundControl.addEventListener("click", changeSoundVolume);
  soundControl.addEventListener("mouseup", changeSoundVolume);

  // задаем максимальное и минимальное значение volume
  soundControl.min = 0;
  soundControl.max = 10;

  soundControl.value = soundControl.max;
});

function playStop() {
  // нахожу мою кнопку с картинкой PLAY и показываю или скрываю ее
  let playImg = document.querySelector(".video__play");
  playImg.classList.toggle("video__play--active");

  // присваиваем ползунку проолжительности видео максимальное значение
  // равное продолжительности нашего видео
  durationControl.max = video.duration;

  // проверяем стоит ли видео на паузе, если да то продолжаем воспроизведение
  if (video.paused) {
    // запускаем видео
    video.play();
    // обновляем ползунок каждые 15 мили секунд функцией updateDuration
    intervalId = setInterval(updateDuration, 1000 / 66);
  } else {
    // понимаем что видео не стоит на паузе,и ставим его на паузу
    video.pause();
    clearInterval(intervalId);
  }
}

// обновляет позицию ползунка продолжительности видео
function updateDuration() {
  durationControl.value = video.currentTime;
}

function stopInterval() {
  video.pause();
  clearInterval(intervalId);
}

// Реализует возможность перемотки видео
function setVideoDuration() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  video.currentTime = durationControl.value;
  // обновляем ползунок каждые 15 мили секунд функцией updateDuration
  intervalId = setInterval(updateDuration, 1000 / 66);
}

// управление звуком видео
function changeSoundVolume() {
  // свойстов video.volume может иметь значени от 0 до 1
  // поэтому делим все на 10 , что бы более четко контролировать значение

  video.volume = soundControl.value / 10;
}

function soundOf() {
  // делаем проверку уровня громкости
  // если у нашего видео есть звук , то мы его выключаем
  // предварительно запомнив текущую позицию громкости в переменную soundLevel

  if (video.volume === 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 10;
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
  }
}





// let player;

// const formatTime = (timeSec) => {
//   const roundTime = Math.round(timeSec);

//   const minutes = Math.floor(roundTime / 60);
//   const seconds = roundTime - minutes * 60;

//   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

//   return `${minutes}:${formattedSeconds}`;
// };

// const onPlayerReady = () => {
//   let interval;
//   let durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));

//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-button").css({
//       left: `${completedPercent}%`,
//     });

//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };

// const eventsInit = () => {
//   $(".player__start").on("click", (e) => {
//     e.preventDefault();
//     const btn = $(e.currentTarget);

//     if (btn.hasClass("paused")) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__playback").on("click", (e) => {
//     const bar = $(e.currentTarget);
//     const newButtonPosition = e.pageX - bar.offset().left;
//     const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
//     const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

//     $(".player__playback-button").css({
//       left: `${buttonPosPercent}%`,
//     });

//     player.seekTo(newPlayerTimeSec);
//   });

//   $(".player__splash").on("click", (e) => {
//     player.playVideo();
//   });
// };

// const onPlayerStateChange = (event) => {
//   const playerButton = $(".player__start");

//   switch (event.data) {
//     case 1:
//       $(".player__wrapper").addClass("active");
//       playerButton.addClass("paused");
//       break;
//     case 2:
//       playerButton.removeClass("paused");
//       break;
//   }
// };

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     videoId: "gvYNxcZQ3B4",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0,
//     },
//   });
// }

// eventsInit();

// const video = document.getElementById("video");
// const play = document.getElementById("play");
// const stop = document.getElementById("stop");
// const progress = document.getElementById("progress");
// const timestamp = document.getElementById("timestamp");

// //play & pause
// function toggleVideoStatus() {
//   if (video.paused) {
//     video.play();
//   } else {
//     video.pause();
//   }
// }

// // update play/pause icon
// function updatePlayIcon() {
//   if (video.paused) {
//     play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
//   } else {
//     play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
//   }
// }

// function stopVideo() {
//   video.currentTime = 0;
//   video.pause();
// }

// //update progress
// function updateProgress() {
//   progress.value = (video.currentTime / video.duration) * 100;

//   //get mins
//   let mins = Math.floor(video.currentTime / 60);
//   if (mins < 10) {
//     mins = "0" + String(mins);
//   }

//   //get secs
//   let secs = Math.floor(video.currentTime % 60);
//   if (secs < 10) {
//     secs = "0" + String(secs);
//   }

//   timestamp.innerHTML = `${mins}:${secs}`;
// }

// //set video time to progress
// function setVideoProgress() {
//   video.currentTime = (progress.value * video.duration) / 100;
// }

// video.addEventListener("click", toggleVideoStatus);
// video.addEventListener("play", updatePlayIcon);
// video.addEventListener("pause", updatePlayIcon);
// video.addEventListener("timeupdate", updateProgress);

// play.addEventListener("click", toggleVideoStatus);
// stop.addEventListener("click", stopVideo);
// progress.addEventListener("change", setVideoProgress);

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     videoId: "gvYNxcZQ3B4",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange,
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0,
//     },
//   });
// }
