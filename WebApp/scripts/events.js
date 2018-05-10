console.log("Start events");
//Setting up Leap Motion
var options={enableGestures: true};
var controller = Leap.loop(options, function(frame){
  //... handle frame data
});

//Validator's getter and setters
var Validator = (function(){
  var leftOrRight = 0;
  var newGesture = true;
  var getLeftOrRight = function(){
    return (leftOrRight<0) ? "left" : "right";
  }
  var resetLeftOrRight = function(){
    leftOrRight = 0;
  }
  var setLeftOrRight = function(gesture){
    if(gesture == "left"){
      leftOrRight --;
    }
    else{
      leftOrRight ++;
    }
  }
  var isNewGesture =function(){
      return newGesture;
  }
  var setNewGesture = function(value){
    newGesture = value;
  }
  return {
    getLeftOrRight : getLeftOrRight,
    resetLeftOrRight : resetLeftOrRight,
    setLeftOrRight : setLeftOrRight,
    isNewGesture : isNewGesture,
    setNewGesture : setNewGesture
  }
}());



function makeCall(swipeDirection){
  var server = "http://10.177.65.71:8080/server/changechannel";
  var payload={
    direction : swipeDirection
  }
  var call=$.ajax({
        type: 'POST',
        url: server,
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(resultData) {
           console.log(JSON.stringify(resultData));
        },
        error: function(error){
          console.error(error);
        }
      });

}
function timerfunc(){
  makeCall(Validator.getLeftOrRight());     //makeCall for left or right direction
  Validator.resetLeftOrRight();             //reSetting Left or Right to 0
  Validator.setNewGesture(true);            //Now upcoming gestures will be new gesture
}
function swipeHandler(gesture){

    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    if (isHorizontal) {
      if (gesture.direction[0] > 0) {
        swipeDirection = "right";
      } else {
        swipeDirection = "left";
      }
    } else {
      if(gesture.direction[1] > 0){
        swipeDirection = "up";
      } else {
          swipeDirection = "down";
      }
    }
    //console.log(swipeDirection + " " + Math.floor(gesture.duration/1000000));
    if ( (swipeDirection == "right" || swipeDirection=="left") && Validator.isNewGesture() ) {
      console.log("New Guesture");
      setTimeout(timerfunc,500);   //millisceconds
      Validator.setNewGesture(false);     //all upcoming gestures will not be new until reset.
    }
    Validator.setLeftOrRight(swipeDirection);
  //  console.log(gesture.duration);
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
