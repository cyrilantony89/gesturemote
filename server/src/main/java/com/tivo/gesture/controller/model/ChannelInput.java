package com.tivo.gesture.controller.model;

public class ChannelInput {

	private String channelName;

	@Override
	public String toString() {
		return "{ channelName : " + channelName + " }";
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

}
