package beans;

import java.io.Serializable;
import java.util.ArrayList;

import enums.SportObjectType;
import enums.StatusSportObject;

public class SportObject implements Serializable{
	private int id;
	private String name;
	private SportObjectType type;
	private String content;
	private StatusSportObject status;
	private Location location;	
	//TODO LOGO
	private String path;
	private double averageRating;
	private String workTime;
	private ArrayList<Integer> coachWhoWorks = new ArrayList<>();
	private boolean isDeleted;
	
	
	public SportObject() {
		this.isDeleted = false;
	}
	public SportObject(String name, String content) {
		this.name = name;
		this.content = content;
	}
	public SportObject(String name, SportObjectType type, String content, StatusSportObject status, Location location,
			double averageRating,String workTime) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
		this.status = status;
		this.location = location;
		this.averageRating = averageRating;
		this.workTime = workTime;		
	}
	
	
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public ArrayList<Integer> getCoachWhoWorks() {
		return coachWhoWorks;
	}
	public void setCoachWhoWorks(ArrayList<Integer> coachWhoWorks) {
		this.coachWhoWorks = coachWhoWorks;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public SportObjectType getType() {
		return type;
	}
	public void setType(SportObjectType type) {
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
	public String getWorkTime() {
		return workTime;
	}
	public void setWorkTime(String workTime) {
		this.workTime = workTime;
	}
	
	
	
	
	
	
	
	
}
