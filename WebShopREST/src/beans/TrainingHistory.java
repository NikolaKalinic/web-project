package beans;

public class TrainingHistory {
	private int id;
	private String dateTime;
	private Training training;
	private String customer;
	private String coach;
	
	public TrainingHistory() {
		
	}

	public TrainingHistory(int id,String dateTime, Training training, String customer, String coach) {
		super();
		this.id = id;
		this.dateTime = dateTime;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
		this.coach = coach;
	}
	
	
}
