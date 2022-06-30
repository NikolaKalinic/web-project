package beans;

import java.text.SimpleDateFormat;
import java.util.Date;

public class PromoCode {
	private int id;
	private String name;
	private Date dateStart;
	private Date dateEnd;
	private int numberOfUse;
	private int percentage;
	
	
	
	public PromoCode() {
		
	}
	public PromoCode(int id, String name, Date dateStart, Date dateEnd, int numberOfUse, int percentage) {
		super();
		this.id = id;
		this.name = name;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.numberOfUse = numberOfUse;
		this.percentage = percentage;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getDateStart() {
		return dateStart;
	}
	public void setDateStart(Date dateStart) {
		this.dateStart = dateStart;
	}
	public Date getDateEnd() {
		return dateEnd;
	}
	public void setDateEnd(Date dateEnd) {
		this.dateEnd = dateEnd;
	}
	public int getNumberOfUse() {
		return numberOfUse;
	}
	public void setNumberOfUse(int numberOfUse) {
		this.numberOfUse = numberOfUse;
	}
	public int getPercentage() {
		return percentage;
	}
	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}
	
	public String displayDateStart() {		
		SimpleDateFormat sdf = new SimpleDateFormat("DD.MM.YYYY.");
		return sdf.format(dateStart);
	}
	
	public String displayDateEnd() {		
		SimpleDateFormat sdf = new SimpleDateFormat("DD.MM.YYYY.");
		return sdf.format(dateEnd);
	}
	
	
	
	
	
	
}
