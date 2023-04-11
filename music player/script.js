const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')


const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const title = document.getElementById('title')
const cover = document.getElementById('music-cover')


//songs titles
const songs =['Blinding Lights','After Hours','Less Than Zero']

let songIndex = 0

LoadSong(songs[songIndex])

function LoadSong(song)
{
    title.innerText = song;
    audio.src = `songs/${song}.mp3`;
    cover.src = `assests/${song}.jpg`;
}




playBtn.addEventListener('click', ()=>{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying)
    {
        PauseSong();
    }
    else{
        playSong();
    }
});

function playSong()
{
    musicContainer.classList.add('play')
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")
    audio.play(); 
}

function PauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector("i.fas").classList.remove("fa-pause")
    playBtn.querySelector("i.fas").classList.add("fa-play")
    audio.pause();
}

function prevSong()
{
    songIndex--
    if(songIndex<0)
    {
        songIndex = songs.length - 1
    }
    LoadSong(songs[songIndex])
    playSong()

}
function nextSong()
{
    songIndex++
    if(songIndex>songs.length-1)
    {
        songIndex = 0
    }
    LoadSong(songs[songIndex])
    playSong()

}
function SetProgress(e){
    const width = this.clientWidth;
   const click = e.offsetX
   const duration = audio.duration
   audio.currentTime = (click/width)*duration
    
}



prevBtn.addEventListener('click' , prevSong)
nextBtn.addEventListener('click' , nextSong)
audio.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click' , SetProgress)
audio.addEventListener('ended' , nextSong)
//update progree bar

function updateProgress(e)
{
    const{duration , currentTime} = e.srcElement;
    const progressPercentage = (currentTime/duration) * 100;
    progress.style.width = `${progressPercentage}%`
}