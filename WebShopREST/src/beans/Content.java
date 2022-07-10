package beans;

import java.util.ArrayList;
import java.util.List;

import enums.ContentType;

public class Content {
	private int id;
	private String name;
	private ContentType type;
	private List<Integer> trainingId;
	private String description;
	private String path;
	private boolean deleted;
	
	public Content() {
		
	}
	public Content(String name, List<Integer> trainingId, ContentType type, String description) {		
		this.name = name;
		this.trainingId = trainingId;
		this.type = type;
		this.description = description;
	}
	public void addTrainingId(int id) {
		if(trainingId == null) {
			trainingId = new ArrayList<Integer>();
		}
		trainingId.add(id);
	}
	
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}	
	public ContentType getType() {
		return type;
	}
	public void setType(ContentType type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Integer> getTrainingId() {
		return trainingId;
	}
	public void setTrainingId(List<Integer> trainingId) {
		this.trainingId = trainingId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	
	
	
}
