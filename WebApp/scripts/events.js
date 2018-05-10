alert("STARTING");
var options={enableGestures: true};
var controller = Leap.loop(options, function(frame){
  //... handle frame data
});
function swipeHandler(gesture){
    //Classify swipe as either horizontal or vertical
    console.log(gesture);

    // var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);

    var compare01 = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    var compare02 = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[2]);
    var compare12 = Math.abs(gesture.direction[1]) > Math.abs(gesture.direction[2]);

    if (compare01 && compare02) {
      // left - right
      if (gesture.direction[0] > 0) {
        // right
        swipeDirection = "right";
      }
      else {
        // left
        swipeDirection = "left";
      }
    }
    else if (!compare01 && compare12) {
      // up - down
      if (gesture.direction[1] > 0) {
        // up
        swipeDirection = "up";
      }
      else {
        // down
        swipeDirection = "down";
      }
    }
    else if (!compare02 && !compare12) {
      // in - out
      if (gesture.direction[2] > 0) {
        // out
        swipeDirection = "out";
      }
      else {
        // in
        swipeDirection = "in";
      }
    }

    // if (isHorizontal) {
    //   if (gesture.direction[0] > 0) {
    //     swipeDirection = "right";
    //   } else {
    //     swipeDirection = "left";
    //   }
    // } else {
    //   // vertical
    //   if(gesture.direction[1] > 0){
    //     swipeDirection = "up";
    //   } else {
    //       swipeDirection = "down";
    //   }
    // }
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
