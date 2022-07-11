package beans;

import java.util.Date;

import enums.TrainingType;

public class Training {
	private String name;
	private int id;
	private TrainingType type;
	private int sportObject;
	private int durationInMinutes;
	private int coach;
	private Date dateTime;	
	private String describe;
	private boolean canceled;
	private int price;
	private String path;
	//TODO SLIKA
	
	public Training() {
		
	}
	public Training(int id,String name, TrainingType type, int sportObjectId, int durationInMinutes,int coach, Date dateTime, String describe, boolean canceled) {
		super();
		this.id=id;
		this.name = name;
		this.type = type;
		this.sportObject = sportObjectId;
		this.durationInMinutes = durationInMinutes;
		this.describe = describe;
		this.dateTime = dateTime;
		this.coach = coach;
		this.canceled = canceled;
	}
	
	
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public boolean getCanceled() {
		return canceled;
	}
	public void setCanceled(boolean canceled) {
		this.canceled = canceled;
	}
	
	public Date getDateTime() {
		return dateTime;
	}
	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCoach() {
		return coach;
	}
	public void setCoach(int coach) {
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
