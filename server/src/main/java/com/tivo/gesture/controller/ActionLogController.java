package com.tivo.gesture.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tivo.gesture.controller.model.GestureActionKnownAtServer;
import com.tivo.gesture.controller.model.GestureActionReportedToServer;

import io.swagger.annotations.Api;

@Controller
@RequestMapping("/app")
@Api(value = "Action Log controller", description = "Operations to report to the gesture patterns input ")
public class ActionLogController {

	@MessageMapping("/report-to-server")
	@SendTo("/server-topic-for-client-to-listen/one")
	public GestureActionKnownAtServer informServer(GestureActionReportedToServer message) throws Exception {
		Thread.sleep(1000); // simulated delay
		return new GestureActionKnownAtServer("!! " + message.getActionreportedtoserver() + " !!");
	}

}
