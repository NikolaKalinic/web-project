package dto;

public class SearchUserDTO {
	private String searchSurname;
	private String searchName;
	private String searchUsername;
	
	public SearchUserDTO() {
		
	}

	public SearchUserDTO(String searchSurname, String searchName, String searchUsername) {
		super();
		this.searchSurname = searchSurname;
		this.searchName = searchName;
		this.searchUsername = searchUsername;
	}

	public String getSearchSurname() {
		return searchSurname;
	}

	public void setSearchSurname(String searchSurname) {
		this.searchSurname = searchSurname;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	public String getSearchUsername() {
		return searchUsername;
	}

	public void setSearchUsername(String searchUsername) {
		this.searchUsername = searchUsername;
	}

}
