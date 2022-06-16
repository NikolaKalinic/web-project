package beans;

import java.time.LocalDateTime;

public class TrainingHistory {
	private LocalDateTime dateTime;
	private Training training;
	private Customer customer;
	private Coach coach;
	
	public TrainingHistory() {
		
	}

	public TrainingHistory(LocalDateTime dateTime, Training training, Customer customer, Coach coach) {
		super();
		this.dateTime = dateTime;
		this.training = training;
		this.customer = customer;
		this.coach = coach;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public Training getTraining() {
		return training;
	}

	public void setTraining(Training training) {
		this.training = training;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Coach getCoach() {
		return coach;
	}

	public void setCoach(Coach coach) {
		this.coach = coach;
	}
	
	
}
