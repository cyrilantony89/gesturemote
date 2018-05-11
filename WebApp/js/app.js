

var channelHash = {
   "BBC HD":"bbc",
   "Sky Sports 4 HD":"skysports",
   "Rajya Sabha TV":"rstv",
   "Cartoon Network":"cn",
   "Discovery HD":"discovery"

};
function showSnackbar(str,time) {
    var x = document.getElementById("snackbar");
    x.innerHTML = str;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, time);
}

function volumeUp(){

  var vid = document.getElementById("channel");
  if(vid.volume <= 0.8){
    vid.volume = (vid.volume + 0.2);
  }else{
    vid.volume = 1;
  }
  showSnackbar("Volume : "+Math.floor(vid.volume*100)+"%" ,3000);

}

function volumeDown(){
  var vid = document.getElementById("channel");
  // console.log(vid.volume);
  if(vid.volume >= 0.2){
    vid.volume = (vid.volume - 0.2);
  }else{
    vid.volume = 0.0;
  }
  showSnackbar("Volume : "+Math.floor(vid.volume*100)+"%" ,3000);
}

function isPlaying(){
  var myVideo = document.getElementById("channel");
  return !myVideo.hidden;
}

function nextSlide(){
  $('.carousel').flickity().flickity('next');
}

function prevSlide(){
  $('.carousel').flickity().flickity('previous');
}

function openChannel(){
  var $carousel = $('.carousel').flickity();
  // get instance
  var flkty = $carousel.data('flickity');
  var selectedIndex = flkty.selectedIndex;
  var videoName = channelHash[$('.carousel-cell').find('h3')[selectedIndex].innerHTML];
  showVideoPlayer(videoName);
}



//showVideoPlayer
function showVideoPlayer(videoName) {

  var sendData = {
     "channelName" : videoName
  };

  $.ajax({
     url: 'http://10.177.65.71:8080/server/getchannel',
     type: 'POST',
     contentType: "application/json; charset=utf-8",
     data: JSON.stringify(sendData),
     success: function(data) {
       var myVideo = document.getElementById("channel");
       $("#main source").attr("src", data.url);
       myVideo.load();
       var isPlaying = myVideo.currentTime > 0 && !myVideo.paused && !myVideo.ended && myVideo.readyState > 2;

      if (!isPlaying) {
        myVideo.play();
      }
       // myVideo.play();
       myVideo.currentTime = data.seconds;
       $(myVideo).show();
       myVideo.hidden = false;
       $("#main").css("z-index","100");
       $("#main").addClass("animation");
     },
     error: function(err) {
        console.log(err);
     }
   });


}


//hideVideoPlayer
function hideVideoPlayer() {
  var myVideo = document.getElementById("channel");
  $("#main").css("z-index", "-100");
  myVideo.pause();
  $(myVideo).hide();
  myVideo.hidden = true;
  $("#main").removeClass("animation");
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        // <DO YOUR WORK HERE>
        hideVideoPlayer();
    }
});
