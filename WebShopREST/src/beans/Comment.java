package beans;

public class Comment {
	private User customer;
	private SportObject sportObject;
	private String text;
	private int mark;
	public Comment() {
		
	}
	public Comment(User customer, SportObject sportObject, String text, int mark) {
		super();
		this.customer = customer;
		this.sportObject = sportObject;
		this.text = text;
		this.mark = mark;
	}
	
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public SportObject getSportObject() {
		return sportObject;
	}
	public void setSportObject(SportObject sportObject) {
		this.sportObject = sportObject;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getMark() {
		return mark;
	}
	public void setMark(int mark) {
		this.mark = mark;
	}
	
	
}
