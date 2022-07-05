package beans;

import enums.CommentStatus;

public class Comment {
	private int id;
	private int customerId;
	private int sportObjectId;
	private String text;
	private int mark;
	private boolean deleted;
	private CommentStatus status;
	public Comment() {
		
	}
	public Comment(int customer, int sportObject, String text, int mark) {
		super();
		this.customerId = customer;
		this.sportObjectId = sportObject;
		this.text = text;
		this.mark = mark;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public CommentStatus getStatus() {
		return status;
	}
	public void setStatus(CommentStatus status) {
		this.status = status;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.deleted = isDeleted;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customer) {
		this.customerId = customer;
	}
	public int getSportObjectId() {
		return sportObjectId;
	}
	public void setSportObjectId(int sportObject) {
		this.sportObjectId = sportObject;
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
