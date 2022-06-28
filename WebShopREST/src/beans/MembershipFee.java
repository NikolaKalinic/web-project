package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

import enums.MembershipFeeType;
import enums.StatusMembershipFee;

public class MembershipFee {
	private String id;
	private MembershipFeeType type;
	private String paymentDate;
	private String expirationDate;
	private int price;
	private User customer;
	private StatusMembershipFee status;
	private int numberOfTerm;
	
	public MembershipFee() {
		
	}

	public MembershipFee(String id, MembershipFeeType type, String paymentDate, String expirationDate,
			int price, User customer, StatusMembershipFee status, int numberOfTerm) {
		super();
		this.id = id;
		this.type = type;
		this.paymentDate = paymentDate;
		this.expirationDate = expirationDate;
		this.price = price;
		this.customer = customer;
		this.status = status;
		this.numberOfTerm = numberOfTerm;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public MembershipFeeType getType() {
		return type;
	}

	public void setType(MembershipFeeType type) {
		this.type = type;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public StatusMembershipFee getStatus() {
		return status;
	}

	public void setStatus(StatusMembershipFee status) {
		this.status = status;
	}

	public int getNumberOfTerm() {
		return numberOfTerm;
	}

	public void setNumberOfTerm(int numberOfTerm) {
		this.numberOfTerm = numberOfTerm;
	}
	
}
