package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import enums.MembershipFeeType;
import enums.StatusMembershipFee;

public class MembershipFee {
	private String id;
	private MembershipFeeType type;
	private Date paymentDate;
	private Date expirationDate;
	private int price;	
	private String username;
	private StatusMembershipFee status;
	private int numberOfTerm;
	
	public MembershipFee() {
		super();
		
	}

	public MembershipFee(String id, MembershipFeeType type, Date paymentDate, Date expirationDate, int price, String username,
			 StatusMembershipFee status, int numberOfTerm) {
		super();
		this.id = id;
		this.type = type;
		this.paymentDate = paymentDate;
		this.expirationDate = expirationDate;
		this.username = username;
		this.price = price;		
		this.status = status;
		this.numberOfTerm = numberOfTerm;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Date getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
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
