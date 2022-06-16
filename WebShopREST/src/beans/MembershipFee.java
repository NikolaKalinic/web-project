package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

import enums.MembershipFeeType;
import enums.StatusMembershipFee;

public class MembershipFee {
	private String id;
	private MembershipFeeType type;
	private LocalDate paymentDate;
	private LocalDateTime expirationDate;
	private int price;
	private Customer customer;
	private StatusMembershipFee status;
	private int numberOfTerm;
	
	public MembershipFee() {
		
	}

	public MembershipFee(String id, MembershipFeeType type, LocalDate paymentDate, LocalDateTime expirationDate,
			int price, Customer customer, StatusMembershipFee status, int numberOfTerm) {
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

	public LocalDate getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}

	public LocalDateTime getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDateTime expirationDate) {
		this.expirationDate = expirationDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
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
