package beans;

import java.io.Serializable;

public class Address implements Serializable {
	private String street;
	private String number;
	private String place;
	private String zipCode;
	private String state;
	
	public Address() {
		
	}
	public Address(String street, String number, String place, String zipCode, String state) {
		super();
		this.street = street;
		this.number = number;
		this.place = place;
		this.zipCode = zipCode;
		this.state = state;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return place + ", " + state;
	}
	
	
	
}
