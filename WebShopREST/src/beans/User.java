package beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import enums.Gender;
import enums.Role;

public class User implements Serializable {
	
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;
	private String dateOfBirth;
	private Role role;
	private String email; //NIJE PO SPECIFIKACIJI
	
	//customer
	private String membershipFeeId;
	private List<SportObject> visitedObject;
	private int numberOfPoints;
	private CustomerType type;
	
	//coach
	private TrainingHistory trainingHistory;
	
	//manager
	private int sportObjectId;
	
	public User() {
	}

	public User(String firstName, String lastName, String email, String username, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
	}

	public User(String username, String password,String dateOfBirth, String firstName, String lastName, Gender gender,
			 Role role,String email) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.email = email;
	}

	
	public User(String username, String password, String firstName, String lastName, Gender gender, String dateOfBirth,
			Role role, String email, String membershipFeeId, List<SportObject> visitedObject, int numberOfPoints,
			CustomerType type, TrainingHistory trainingHistory, int sportObjectId) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.email = email;
		this.membershipFeeId = membershipFeeId;
		this.visitedObject = visitedObject;
		this.numberOfPoints = numberOfPoints;
		this.type = type;
		this.trainingHistory = trainingHistory;
		this.sportObjectId = sportObjectId;
	}

	public String getMembershipFeeId() {
		return membershipFeeId;
	}

	public void setMembershipFee(String membershipFee) {
		this.membershipFeeId = membershipFee;
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

	public TrainingHistory getTrainingHistory() {
		return trainingHistory;
	}

	public void setTrainingHistory(TrainingHistory trainingHistory) {
		this.trainingHistory = trainingHistory;
	}

	public int getSportObjectId() {
		return sportObjectId;
	}

	public void setSportObjectId(int sportObjectId) {
		this.sportObjectId = sportObjectId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public String getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}







	private static final long serialVersionUID = 6640936480584723344L;

}
