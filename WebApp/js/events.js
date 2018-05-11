console.log("Start events");


//Validator's getter and setters
var Validator = (function(){
  var leftOrRight = 0;
  var upOrDown = 0;
  var newGesture = true;
  var historySamples = [];

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

  var addHistorySample = function(value){
    historySamples.push(value);
  }

  var resetHistorySample = function(){
    historySamples = [];
  }

  var isHistoryEmpty = function(){
    if(historySamples.length == 0){
      return true;
    }
    return false;
  }

  var historySamplesLength = function(){
    return historySamples.length;
  }

  var getHistoryElement = function(index){
    return historySamples[index];
  }

  return {
    getLeftRightUpOrDown : getLeftRightUpOrDown,
    resetLeftRightUpOrDown : resetLeftRightUpOrDown,
    setLeftRightUpOrDown : setLeftRightUpOrDown,
    isNewGesture : isNewGesture,
    setNewGesture : setNewGesture,
    addHistorySample : addHistorySample,
    resetHistorySample : resetHistorySample,
    isHistoryEmpty : isHistoryEmpty,
    historySamplesLength : historySamplesLength,
    getHistoryElement : getHistoryElement
  }
}());

//Setting up Leap Motion
var options={enableGestures: true};
var controller = Leap.loop(options, function(frame){
  //... handle frame data
  if(frame.valid){
    if(frame.gestures.length > 0){
      Validator.resetHistorySample();
      frame.gestures.forEach(function(gesture){
        switch (gesture.type){
                  case "swipe":
                      swipeHandler(frame,gesture);
                      break;
                  case "screenTap":
                      //circleHandler(gesture);
                  case "keyTap":
                      //circleHandler(gesture);
                      break;
                  case "circle":
                      circleHandler(gesture);
                      break;
        }
      });
    } else if(frame.hands.length>0) {
        var hand = frame.hands[0];
        handGrabHandler(hand.grabStrength);
    }
  }
});

function handGrabHandler(grabStrength){
  // console.log(grabStrength);
  if(grabStrength == 1) {
    if(!Validator.isHistoryEmpty() && Validator.getHistoryElement(0)==0 && Validator.historySamplesLength() > 1){
      console.log("play channel");
    }
    Validator.resetHistorySample();
    Validator.addHistorySample(1);

    // console.log("HAND iS CLOSED");
  } else if (grabStrength == 0) {
    if(!Validator.isHistoryEmpty() && Validator.getHistoryElement(0)==1 && Validator.historySamplesLength() > 1){
      console.log("back to pgd");
      hideVideoPlayer();
    }
    Validator.resetHistorySample();
    Validator.addHistorySample(0);
    // console.log("HAND iS OPEN");
  } else {
    Validator.addHistorySample(grabStrength);
    // console.log(" HAND MIDDLE");
  }
}

function makeCall(swipeDirection){
  if(!isPlaying()){
     if(swipeDirection=="left"){
       nextSlide();
     }else{
       prevSlide();
     }
  }else{

  }

}

function updateVolume(direction){
  //VIKAS TODO
  if(isPlaying()){
    if(direction == "up"){
      volumeUp();
    }else{
      volumeDown();
    }
    console.log("UPDATE VOLUME FOR : "+direction);
  }
}

function reset(){
  Validator.resetLeftRightUpOrDown();             //reSetting Left or Right to 0
  Validator.setNewGesture(true);            //Now upcoming gestures will be new gesture
}

function timerfunc(){
  var direction = Validator.getLeftRightUpOrDown();
  if(direction == "left" || direction == "right"){
    makeCall(direction);     //makeCall for left or right direction
  }
  else {
    updateVolume(direction);
  }
  setTimeout(reset,300);
}
function swipeHandler(frame,gesture){
  //Handles all swipe related events
    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    if (isHorizontal) {
      swipeDirection = (gesture.direction[0] > 0) ?  "right" :  "left";

    } else {
      //swipeDirection = (gesture.direction[1] > 0) ? "up" : "down";
      swipeDirection = (frame.hand(gesture.handIds[0]).palmNormal[1] > 0) ? "up" : "down";
    }
    //console.log(swipeDirection + " " + Math.floor(gesture.duration/1000000));
    if ( Validator.isNewGesture() ) {
      console.log("New Guesture");
      setTimeout(timerfunc,300);   //millisceconds
      Validator.setNewGesture(false);     //all upcoming gestures will not be new until reset.
    }
    Validator.setLeftRightUpOrDown(swipeDirection);
  //  console.log(gesture.duration);
}

function circleHandler(gesture){
    if(!isPlaying()){
    console.log("circling");
    openChannel();
    return;
    }
}
