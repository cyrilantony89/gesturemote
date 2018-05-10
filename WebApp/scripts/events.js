alert("STARTING");
var options={enableGestures: true};
var controller = Leap.loop(options, function(frame){
  //... handle frame data
});
function swipeHandler(gesture){
    //Classify swipe as either horizontal or vertical
    console.log(gesture);
    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

    if (isHorizontal) {
      if (gesture.direction[0] > 0) {
        swipeDirection = "right";
      } else {
        swipeDirection = "left";
      }
    } else {
      // vertical
      if(gesture.direction[1] > 0){
        swipeDirection = "up";
      } else {
          swipeDirection = "down";
      }
    }
    console.log(swipeDirection);
}
controller.on("gesture", function(gesture){
  switch (gesture.type){
            case "swipe":
                swipeHandler(gesture);
                break;
            case "circle":
                //console.log("Circle Gesture");
                break;
            case "keyTap":
                //console.log("Key Tap Gesture");
                break;
            case "screenTap":
                //console.log("Screen Tap Gesture");
                break;
          }
});
