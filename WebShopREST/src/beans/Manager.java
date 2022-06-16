package beans;

public class Manager {
	private SportObject sportObject;

	public Manager() {
		
	}
	public Manager(SportObject sportObject) {
		super();
		this.sportObject = sportObject;
	}
	public SportObject getSportObject() {
		return sportObject;
	}
	public void setSportObject(SportObject sportObject) {
		this.sportObject = sportObject;
	}
	
	
}
