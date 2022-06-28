package beans;

public class TrainingHistory {
	private String dateTime;
	private Training training;
	private User customer;
	private User coach;
	
	public TrainingHistory() {
		
	}

	public TrainingHistory(String dateTime, Training training, User customer, User coach) {
		super();
		this.dateTime = dateTime;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public Training getTraining() {
		return training;
	}

	public void setTraining(Training training) {
		this.training = training;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public User getCoach() {
		return coach;
	}

	public void setCoach(User coach) {
		this.coach = coach;
	}
	
	
}
