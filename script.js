let timer;
let time = 25 * 60;
const timerDisplay = document.getElementById("timer");
const quoteDisplay = document.getElementById("quote");
const audio = document.getElementById("ambient");

const ambientTracks = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3",
];

const backupQuotes = [
  "Reste focus, tu vas y arriver !",
  "Chaque minute compte, fonce !",
  "C’est dans l’effort qu’on trouve le succès.",
  "Le travail d’aujourd’hui est le succès de demain.",
  "Un pas à la fois, tu avances.",
  "Ne lâche rien, tu construis ton avenir.",
  "Ta constance est ton super pouvoir.",
  "Visualise ton objectif et avance.",
  "Moins d’excuses, plus d’action.",
  "Tu es plus capable que tu ne le crois.",
  "Concentre-toi. Respire. Réussis.",
  "Fais-le pour ton futur toi.",
  "Le progrès, pas la perfection.",
  "Tu domines ta journée, pas l’inverse.",
  "Garde ton calme et continue.",
  "Rêve en grand, travaille dur.",
  "Les grandes choses prennent du temps.",
  "Focus = Force.",
  "Le succès est un effet secondaire de la discipline.",
  "Fais-le avec passion ou pas du tout.",
];

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      alert("Temps écoulé ! Fais une pause ☕");
    }
  }, 1000);
  playRandomTrack();
  fetchQuote();
}

function resetTimer() {
  clearInterval(timer);
  time = 25 * 60;
  updateDisplay();
  audio.pause();
  audio.currentTime = 0;
}

function playRandomTrack() {
  const randomIndex = Math.floor(Math.random() * ambientTracks.length);
  audio.src = ambientTracks[randomIndex];
  audio.play();
}

function fetchQuote() {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      quoteDisplay.textContent = `"${randomQuote.text}"`;
    })
    .catch(() => {
      const randomBackup =
        backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
      quoteDisplay.textContent = `"${randomBackup}"`;
    });
}

updateDisplay();
