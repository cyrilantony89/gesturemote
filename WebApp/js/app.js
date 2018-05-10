$(".carousel-cell").click(function(event) {
    //get video name

    var videoName = $(this).find('h3')[0].innerText;
    showVideoPlayer(videoName);

});


function nextSlide(){

}

function prevSlide(){

}

var myVideo = document.getElementById("channel");

//showVideoPlayer
function showVideoPlayer(videoName) {
  $("#main source").attr("src", "videos/" + videoName + ".mp4");

  myVideo.load();
  myVideo.play();
  $(myVideo).show();
  $("#main").css("z-index","100");
  $("#main").addClass("animation");

}


//hideVideoPlayer
function hideVideoPlayer() {
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
