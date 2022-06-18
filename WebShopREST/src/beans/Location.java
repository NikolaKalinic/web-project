package beans;

import java.io.Serializable;

public class Location implements Serializable {
	private int longitude;
	private int latitude;
	private Address address;
	
	public Location() {
		
	}

	public Location(int longitude, int latitude, Address address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public int getLongitude() {
		return longitude;
	}

	public void setLongitude(int longitude) {
		this.longitude = longitude;
	}

	public int getLatitude() {
		return latitude;
	}

	public void setLatitude(int latitude) {
		this.latitude = latitude;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return address.toString();
	}
	
	
}
