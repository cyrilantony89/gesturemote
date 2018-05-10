var stompClient = null;

function setConnected(connected) {
//    $("#connect").prop("disabled", connected);
//    $("#disconnect").prop("disabled", !connected);
    
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/server-topic-for-client-to-listen/one', function (greeting) {
            showGreeting(JSON.parse(greeting.body).action);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName(value) {
    //stompClient.send("/app/report-to-server", {}, JSON.stringify({'actionreportedtoserver': $("#name").val()}));
	stompClient.send("/app/report-to-server", {}, JSON.stringify({'actionreportedtoserver': value}));
}

function clearAlls() {
	console.log("Clearing stuff");
	$("#greetings").html("");
}
function showGreeting(message) {
    $("#greetings").append("<li class='list-group-item'>"+message+"</li>");
}

$(function () {
//    $("form").on('submit', function (e) {
//        e.preventDefault();
//    });
    connect();
   // $( "#connect" ).click(function() { connect(); });
   // $( "#disconnect" ).click(function() { disconnect(); });
   // $( "#send" ).click(function() { sendName(); });
    
});

