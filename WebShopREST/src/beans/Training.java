package beans;

import enums.TrainingType;

public class Training {
	private String name;
	private TrainingType type;
	private SportObject sportObject;
	private int durationInMinutes;
	private Coach coach;
	private String describe;
	//TODO SLIKA
	
	public Training() {
		
	}
	public Training(String name, TrainingType type, SportObject sportObject, int durationInMinutes,Coach coach, String describe) {
		super();
		this.name = name;
		this.type = type;
		this.sportObject = sportObject;
		this.durationInMinutes = durationInMinutes;
		this.describe = describe;
		this.coach = coach;
	}
	
	
	public Coach getCoach() {
		return coach;
	}
	public void setCoach(Coach coach) {
		this.coach = coach;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TrainingType getType() {
		return type;
	}
	public void setType(TrainingType type) {
		this.type = type;
	}
	public SportObject getSportObject() {
		return sportObject;
	}
	public void setSportObject(SportObject sportObject) {
		this.sportObject = sportObject;
	}
	public int getDurationInMinutes() {
		return durationInMinutes;
	}
	public void setDurationInMinutes(int durationInMinutes) {
		this.durationInMinutes = durationInMinutes;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	
	
}
