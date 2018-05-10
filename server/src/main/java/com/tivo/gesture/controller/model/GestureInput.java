package com.tivo.gesture.controller.model;

public class GestureInput {

	private String currenturl;
	private String direction;

	public String getCurrenturl() {
		return currenturl;
	}

	public void setCurrenturl(String currenturl) {
		this.currenturl = currenturl;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

	@Override
	public String toString() {
		return "{ direction : " + direction + " }";
	}

}
