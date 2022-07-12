package dto;

public class SearchTrainingDTO {
	private String name;
	private String than;
	private String to;
	
	public SearchTrainingDTO() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getThan() {
		return than;
	}

	public void setThan(String than) {
		this.than = than;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public SearchTrainingDTO(String name, String than, String to) {
		super();
		this.name = name;
		this.than = than;
		this.to = to;
	}
	
}
