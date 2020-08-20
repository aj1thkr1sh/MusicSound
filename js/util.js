document.getElementById("scan-button").addEventListener("click", function(){
    document.getElementById("scan").hidden = !document.getElementById("scan").hidden;
    document.getElementById("instrument-descriptor").hidden = !document.getElementById("scan").hidden;
    if(audio){
      audio.pause();
    }
});

var audio;

document.getElementById("back-button").addEventListener("click", function(){
  document.getElementById("instrument-descriptor").hidden = true;
  document.getElementById("scan").hidden = false;
  if(audio){
    audio.pause();
  }
});

function loadInstrument(data){

  try{
      var instrument = getInstrumentFromURL(data);
  }catch(e){
    return;
  }
  if(!MusicInstrument[instrument]){
    return;
  }

  document.getElementById("instrument-descriptor").hidden = false;
  console.log(data);

  document.getElementById("scan").hidden = true

  var audioArray = MusicInstrument[instrument].music;
  var imageArray = MusicInstrument[instrument].image;

  console.log(audioArray+" "+imageArray);

  imageURL = MusicInstrument[instrument].image[getRandomNumberOfRange(0, MusicInstrument[instrument].image.length - 1)];
  audioURL = MusicInstrument[instrument].music[getRandomNumberOfRange(0, MusicInstrument[instrument].music.length - 1)];

  console.log(imageURL+" "+audioURL);

  document.querySelector("#instrument-descriptor img").setAttribute("src",imageURL);
  document.querySelector("#instrument-descriptor .card-body .card-title").innerHTML = MusicInstrument[instrument].name;

  if(audio){
    audio.pause();
  }

  audio = new Audio(audioURL);
  audio.play();

  console.log(audio.src);

}

function getInstrumentFromURL(data){
  var url = new URL(data);
  url = url.hash;
  return url.replace(/#/g,"");
}

function getRandomNumberOfRange(from, to){
  from = Math.ceil(from);
  to = Math.floor(to);
  return Math.floor(Math.random() * ( to - from + 1)) + from;
}
