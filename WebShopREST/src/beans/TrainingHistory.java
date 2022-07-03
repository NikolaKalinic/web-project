package beans;

import java.util.Date;

public class TrainingHistory {
	private int id;
	private Date dateTime;
	private int trainingId;
	private int customerId;	
	
	public TrainingHistory() {
		
	}

	public TrainingHistory(int training, int customer) {
		super();		
		this.trainingId = training;
		this.customerId = customer;		
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	public int getTrainingId() {
		return trainingId;
	}

	public void setTrainingId(int training) {
		this.trainingId = training;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customer) {
		this.customerId = customer;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
	
}
