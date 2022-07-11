package dto;

public class SearchObjectDTO {
	private String searchName;
	private String searchType;
	private String location;
	private double avg;
	
	public SearchObjectDTO() {
		
	}
	public SearchObjectDTO(String searchName, String searchType, String location, double avg) {
		super();
		this.searchName = searchName;
		this.searchType = searchType;
		this.location = location;
		this.avg = avg;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public double getAvg() {
		return avg;
	}
	public void setAvg(double avg) {
		this.avg = avg;
	}
	
	
	
}
