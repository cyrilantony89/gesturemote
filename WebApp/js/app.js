

var channelHash = {
   "BBC HD":"bbc",
   "Sky Sports 4 HD":"skysports",
   "Rajya Sabha TV":"rstv",
   "Cartoon Network":"cn",
   "Discovery HD":"discovery"

};

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
       myVideo.play();
       myVideo.currentTime = data.seconds;
       $(myVideo).show();
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
  $("#main").removeClass("animation");
}

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        // <DO YOUR WORK HERE>
        hideVideoPlayer();
    }
});
