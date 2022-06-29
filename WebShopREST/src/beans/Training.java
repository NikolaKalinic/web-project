package beans;

import enums.TrainingType;

public class Training {
	private String name;
	private int id;
	private TrainingType type;
	private int sportObject;
	private int durationInMinutes;
	private User coach;
	private String describe;
	//TODO SLIKA
	
	public Training() {
		
	}
	public Training(int id,String name, TrainingType type, int sportObjectId, int durationInMinutes,User coach, String describe) {
		super();
		this.id=id;
		this.name = name;
		this.type = type;
		this.sportObject = sportObjectId;
		this.durationInMinutes = durationInMinutes;
		this.describe = describe;
		this.coach = coach;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getCoach() {
		return coach;
	}
	public void setCoach(User coach) {
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
	public int getSportObject() {
		return sportObject;
	}
	public void setSportObject(int sportObject) {
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
