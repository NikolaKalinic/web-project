package beans;

public class PromoCode {
	private int id;
	private String name;
	private String period;
	private int numberOfUse;
	private int percentage;
	
	public PromoCode() {
		
	}
	
	public PromoCode(int id, String name, String period, int numberOfUse, int percentage) {
		super();
		this.id = id;
		this.name = name;
		this.period = period;
		this.numberOfUse = numberOfUse;
		this.percentage = percentage;
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

	public String getPeriod() {
		return period;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public int getNumberOfUse() {
		return numberOfUse;
	}

	public void setNumberOfUse(int numberOfUse) {
		this.numberOfUse = numberOfUse;
	}

	public int getPercentage() {
		return percentage;
	}

	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}
	
	
	
	
	
	
}
