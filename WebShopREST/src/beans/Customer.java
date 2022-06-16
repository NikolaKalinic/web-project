package beans;

import java.util.List;

public class Customer extends User{
	private MembershipFee membershipFee;
	private List<SportObject> visitedObject;
	private int numberOfPoints;
	private CustomerType type;
	
	public Customer() {
		
	}
	public Customer(MembershipFee membershipFee, List<SportObject> visitedObject, int numberOfPoints, CustomerType type) {
		super();
		this.membershipFee = membershipFee;
		this.visitedObject = visitedObject;
		this.numberOfPoints = numberOfPoints;
		this.type = type;
	}
	public MembershipFee getMembershipFee() {
		return membershipFee;
	}
	public void setMembershipFee(MembershipFee membershipFee) {
		this.membershipFee = membershipFee;
	}
	public List<SportObject> getVisitedObject() {
		return visitedObject;
	}
	public void setVisitedObject(List<SportObject> visitedObject) {
		this.visitedObject = visitedObject;
	}
	public int getNumberOfPoints() {
		return numberOfPoints;
	}
	public void setNumberOfPoints(int numberOfPoints) {
		this.numberOfPoints = numberOfPoints;
	}
	public CustomerType getType() {
		return type;
	}
	public void setType(CustomerType type) {
		this.type = type;
	}
	
	
	
}
