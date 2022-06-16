package beans;

import enums.CustomerTypeName;

public class CustomerType {
	private CustomerTypeName name;
	private int discount;
	private int requiredNumberOfPoints;
	
	public CustomerType() {
		
	}
	
	public CustomerType(CustomerTypeName name, int discount, int requiredNumberOfPoints) {
		super();
		this.name = name;
		this.discount = discount;
		this.requiredNumberOfPoints = requiredNumberOfPoints;
	}

	public CustomerTypeName getName() {
		return name;
	}

	public void setName(CustomerTypeName name) {
		this.name = name;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public int getRequiredNumberOfPoints() {
		return requiredNumberOfPoints;
	}

	public void setRequiredNumberOfPoints(int requiredNumberOfPoints) {
		this.requiredNumberOfPoints = requiredNumberOfPoints;
	}
	
	
}
