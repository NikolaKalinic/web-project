package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import Personal.PersonalConfig;
import beans.Comment;
import beans.SportObject;
import enums.CommentStatus;

public class CommentDAO {
	private ArrayList<Comment> comments;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type COMMENT_TYPE = new TypeToken<ArrayList<Comment>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public CommentDAO(String contextPath) {
    	comments = new ArrayList<>();
    	ArrayList<Comment> tmp = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"comments.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            tmp = g.fromJson(reader, COMMENT_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	            
	        }
		 for(Comment c : tmp) {
			 if(!c.isDeleted()) {
				 comments.add(c);
			 }
		 }
		 
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(comments));
        out.close();
    }
    
    public void create(Comment s) throws FileNotFoundException {
		s.setId(getNewId());
		comments.add(s);
		toJSON(pathToFile+"comments.json");
	}
    
    private int getNewId() {
		if(comments.isEmpty())
			return 100;
		int maxId = comments.get(0).getId();
		for(Comment so : comments) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
    
    public ArrayList<Comment> getAll(){
		return comments;
	}
	
	public Comment getById(int wantedId) {
		for(Comment s : comments) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<comments.size();i++) {
			if(comments.get(i).getId() == id) {
				comments.get(i).setDeleted(true);
				toJSON(pathToFile+"comments.json");
			}
		}
	}
	
	public ArrayList<Comment> getByObjectId(int objectId){
		ArrayList<Comment> retVal = new ArrayList<Comment>();
		for(Comment c : comments) {
			if(c.getSportObjectId() == objectId) {
				retVal.add(c);
			}
		}
		return retVal;
	}
	
	public ArrayList<Comment> reject(int id ) throws FileNotFoundException {
		int objId=-1;
		for(Comment c : comments)  {
			if(c.getId()==id) {
				objId=c.getSportObjectId();
				c.setStatus(CommentStatus.Rejected);
				toJSON(pathToFile+"comments.json");
			}
		}
		return getByObjectId(objId);
	}
	
	public ArrayList<Comment> accept(int id ) throws FileNotFoundException {
		int objId=-1;
		for(Comment c : comments)  {
			if(c.getId()==id) {
				objId=c.getSportObjectId();
				c.setStatus(CommentStatus.Accepted);
				toJSON(pathToFile+"comments.json");
			}
		}
		return getByObjectId(objId);
	}
}
