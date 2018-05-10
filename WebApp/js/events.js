console.log("Start events");
//Setting up Leap Motion
var options={enableGestures: true};
var controller = Leap.loop(options, function(frame){
  //... handle frame data
});

//Validator's getter and setters
var Validator = (function(){
  var leftOrRight = 0;
  var upOrDown = 0;
  var newGesture = true;

  var resetLeftRightUpOrDown = function(){
    leftOrRight = 0;
    upOrDown = 0;
  }

  var setLeftRightUpOrDown = function(gesture){
    if(gesture == "left"){
      leftOrRight --;
    }
    else if(gesture == "right"){
      leftOrRight ++;
    }
    else if (gesture == "up"){
      upOrDown ++;
    }
    else{               //down
      upOrDown --;
    }
  }

  var getLeftRightUpOrDown = function(){
    // return (leftOrRight<0) ? "left" : "right";
    if(Math.abs(leftOrRight) > Math.abs(upOrDown)){
      return (leftOrRight<0) ? "left" : "right";
    }
    else{
      return (upOrDown < 0 ) ? "down" : "up";
    }
  }

  var isNewGesture =function(){
      return newGesture;
  }

  var setNewGesture = function(value){
    newGesture = value;
  }
  return {
    getLeftRightUpOrDown : getLeftRightUpOrDown,
    resetLeftRightUpOrDown : resetLeftRightUpOrDown,
    setLeftRightUpOrDown : setLeftRightUpOrDown,
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

function updateVolume(direction){
  //VIKAS TODO
  console.log("UPDATE VOLUME FOR : "+direction);
}

function timerfunc(){
  var direction = Validator.getLeftRightUpOrDown();
  if(direction == "left" || direction == "right"){
    makeCall(direction);     //makeCall for left or right direction
  }
  else {
    updateVolume(direction);
  }
  Validator.resetLeftRightUpOrDown();             //reSetting Left or Right to 0
  Validator.setNewGesture(true);            //Now upcoming gestures will be new gesture
}
function swipeHandler(gesture){

    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    if (isHorizontal) {
      swipeDirection = (gesture.direction[0] > 0) ?  "right" :  "left";

    } else {
      swipeDirection = (gesture.direction[1] > 0) ? "up" : "down";
    }
    //console.log(swipeDirection + " " + Math.floor(gesture.duration/1000000));
    if ( Validator.isNewGesture() ) {
      console.log("New Guesture");
      setTimeout(timerfunc,500);   //millisceconds
      Validator.setNewGesture(false);     //all upcoming gestures will not be new until reset.
    }
    Validator.setLeftRightUpOrDown(swipeDirection);
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
