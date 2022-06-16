package beans;

import java.time.LocalTime;

import enums.StatusSportObject;

public class SportObject {
	private String name;
	private String type;
	private String content;
	private StatusSportObject status;
	private Location location;
	//TODO LOGO
	private double averageRating;
	private LocalTime workTime;
	
	public SportObject() {
		
	}
	public SportObject(String name, String type, String content, StatusSportObject status, Location location,
			double averageRating, LocalTime workTime) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
		this.status = status;
		this.location = location;
		this.averageRating = averageRating;
		this.workTime = workTime;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public StatusSportObject getStatus() {
		return status;
	}
	public void setStatus(StatusSportObject status) {
		this.status = status;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}
	public LocalTime getWorkTime() {
		return workTime;
	}
	public void setWorkTime(LocalTime workTime) {
		this.workTime = workTime;
	}
	
	
}
