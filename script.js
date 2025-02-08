const songs = [
    {
        name: "Happy Dance",
        artist: "John Doe",
        src: "songs/song1.mp3",
        img: "photos/photo8.jpg"
    },
    {
        name: "Flying Balloon",
        artist: "Jane Smith",
        src: "songs/song2.mp3",
        img: "photos/photo2.webp"
    },
    {
        name: "Cute Cat Wink",
        artist: "Emily Johnson",
        src: "songs/song3.mp3",
        img: "photos/photo3.webp"
    },
    {
        name: "Bouncing Heart",
        artist: "Michael Brown",
        src: "songs/song4.mp3",
        img: "photos/photo4.jpg"
    },
    {
        name: "Smiling Sun",
        artist: "Olivia Wilson",
        src: "songs/song5.mp3",
        img: "photos/photo5.jpg"
    },
    {
        name: "Rainbow Splash",
        artist: "David Lee",
        src: "songs/song6.mp3",
        img: "photos/photo6.jpg"
    },
    {
        name: "Waving Hand",
        artist: "Sophia Davi",
        src: "songs/song7.mp3",
        img: "photos/photo7.jpg"
    },
    {
        name: "Jumping Sta",
        artist: "James Taylor",
        src: "songs/song8.mp3",
        img: "photos/photo1.jpg"
    },
]
let animation = lottie.loadAnimation({
    container: document.getElementById("lottie-container"),
    renderer: "svg",
    loop: true,
    autoplay: false,
    path: "https://lottie.host/5d6204c8-b36c-47d7-98de-44e8b29f35bb/ibyBDZEXCo.json"
})

let seekBar = document.getElementById("seekBar");
let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");
let playbtn = document.querySelector("#playbtn")
let Resetbtn = document.getElementById("resetbtn")
let ul = document.getElementById("songList")
let isPlaying = false;
let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].src)

const songNameElement = document.querySelector('.song-name h3')
const artistElement = document.querySelector('.song-name h4')
const imgElement = document.querySelector('.secondbox img')

function loadSong(index) {
    const song = songs[index];
    songNameElement.textContent = song.name;
    artistElement.textContent = song.artist;
    imgElement.src = song.img;
    audio.src = song.src;
    seekBar.value = 0;
    currentTimeEl.innerText = "0.00";
    totalDurationEl.innerText = "0.00";
}

document.querySelector('.ri-skip-forward-fill').addEventListener('click', function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    animation.goToAndPlay(0, true);
    isPlaying = true;
    playbtn.classList.remove("ri-play-circle-fill");
    playbtn.classList.add("ri-pause-circle-fill");
});

document.querySelector('.ri-skip-back-fill').addEventListener('click', function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    animation.goToAndPlay(0, true);
    isPlaying = true;
    playbtn.classList.remove("ri-play-circle-fill");
    playbtn.classList.add("ri-pause-circle-fill");
});

playbtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause()
        animation.pause()
        playbtn.classList.remove("ri-pause-circle-fill")
        playbtn.classList.add("ri-play-circle-fill")
    }
    else {
        audio.play()
        animation.play()
        playbtn.classList.remove("ri-play-circle-fill")
        playbtn.classList.add("ri-pause-circle-fill")
    }
    isPlaying = !isPlaying
})
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
audio.addEventListener("loadedmetadata", () => {
    totalDurationEl.innerText = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration) && audio.duration > 0) {
        let progress = (audio.currentTime / audio.duration) * 100;
        seekBar.value = progress;
        currentTimeEl.innerText = formatTime(audio.currentTime);
    }
});
seekBar.addEventListener("input", () => {
    let seekTime = (seekBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

Resetbtn.addEventListener("click", () => {

    audio.currentTime = 0;
    seekBar.value = 0;
    audio.pause();
    animation.pause();
    playbtn.classList.remove("ri-pause-circle-fill")
    playbtn.classList.add("ri-play-circle-fill")
    isPlaying = false
})
loadSong(currentSongIndex);
const songlist = [
    {
        images: "photos/photo8.jpg",
        songnames: "Happy Dance",
        artistnames: "John Doe",

    },
    {
        images: "photos/photo2.webp",
        songnames: "Flying Balloon",
        artistnames: "Jane Smith",
    },
    {
        images: "photos/photo3.webp",
        songnames: "Cute Cat Wink",
        artistnames: "Emily Johnson",

    },
    {
        images: "photos/photo4.jpg",
        songnames: "Bouncing Heart",
        artistnames: "Michael Brown",

    },
    {
        images: "photos/photo5.jpg",
        songnames: "Smiling Sun",
        artistnames: "Olivia Wilson",

    },
    {
        images: "photos/photo6.jpg",
        songnames: "Rainbow Splash",
        artistnames: "David Lee",

    },
    {
        images: "photos/photo7.jpg",
        songnames: "Waving Hand",
        artistnames: "Sophia Davi",
    },
    {
        images: "photos/photo1.jpg",
        songnames: "Jumping Sta",
        artistnames: "James Taylor",
    },
]


let firstcontain = document.querySelector(".firstsmall-container")
let secondcontain = document.querySelector(".secondsmall-container")

let playlistIcons = document.querySelectorAll(".playlistIcon")
playlistIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const isSecondvisible =
            secondcontain.style.display === "block";
        secondcontain.style.display = isSecondvisible ? "none" : "block";
        firstcontain.style.display = isSecondvisible ? "block" : "none";
        localStorage.setItem("display", JSON.stringify(!isSecondvisible))
    })
})
function savethetask() {
    if (secondcontain.style.display === "block") {
        localStorage.setItem("display", JSON.stringify("true"))
    }
    else {
        localStorage.setItem("display", JSON.stringify("false"))
    }
    let displaystate = JSON.parse(localStorage.getItem("display"))
    if (displaystate === true) {
        secondcontain.style.display = "block"
    }
    else {
        secondcontain.style.display = "none"
    }
}
window.onload = function () {
    let displaystate = JSON.parse(localStorage.getItem("display"));

    // Check agar value null hai (first time load pe)
    if (displaystate === null) {
        secondcontain.style.display = "none";
        firstcontain.style.display = "block";
    } else if (displaystate === true) {
        secondcontain.style.display = "block";
        firstcontain.style.display = "none";
    } else {
        secondcontain.style.display = "none";
        firstcontain.style.display = "block";
    }
}


ul.innerHTML = "";  // Purani list clear karna

songlist.forEach((listsong) => {
    let li = document.createElement("li");
    li.classList.add("li-list");

    // Naya image element banaya
    let img = document.createElement("img");
    img.src = listsong.images;
    img.alt = listsong.songnames;
    img.style.width = "50px";  // Image ka size adjust karna
    img.style.height = "50px";
    img.style.marginRight = "10px";

    // Naya text element banaya
    let text = document.createElement("span");
    text.textContent = `${listsong.songnames} - ${listsong.artistnames}`;

    // Image aur text ko li mein add karna
    li.appendChild(img);
    li.appendChild(text);
    ul.appendChild(li);

    li.addEventListener("click", () => {
        currentSongIndex = songs.findIndex(song => song.name === listsong.songnames && song.artist === listsong.artistnames);
        loadSong(currentSongIndex);
        audio.play();
        animation.goToAndPlay(0, true);
        isPlaying = true;
        playbtn.classList.remove("ri-play-circle-fill");
        playbtn.classList.add("ri-pause-circle-fill");

        firstcontain.style.display = "block";
        secondcontain.style.display = "none";
    });

});


