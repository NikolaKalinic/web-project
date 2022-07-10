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
import beans.Content;
import beans.MembershipFee;
import beans.User;

public class ContentDAO {
	private ArrayList<Content> contents;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type CONTENT_TYPE = new TypeToken<ArrayList<Content>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public ContentDAO(String contextPath) {
    	contents = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"contents.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            contents = g.fromJson(reader, CONTENT_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(contents));
        out.close();
    }
    
    public void create(Content s) throws FileNotFoundException {
		s.setId(getNewId());	
		s.setDeleted(false);
		contents.add(s);
		toJSON(pathToFile+"contents.json");		
	}
	
	private int getNewId() {
		if(contents.isEmpty())
			return 100;
		int maxId = contents.get(contents.size() - 1).getId();
		for(Content so : contents) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<Content> getAll(){
		return contents;
	}
	
	public Content getById(int wantedId) {
		for(Content s : contents) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	public boolean checkDoesExists(String name) {
		boolean exists = false;
		for(Content u : contents) {
			if(u.getName().equals(name)) {
				exists=true;
			}
		}
		return exists;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(Content c : contents) {
			if(c.getId() == id) {
				c.setDeleted(true);
				toJSON(pathToFile+"contents.json");
			}
		}
//		for(int i = 0; i<contents.size();i++) {
//			if(contents.get(i).getId() == id) {
//				contents.remove(i);
//				toJSON(pathToFile+"contents.json");
//			}
//		}
	}
	
	public int getContentIdByName(String name) {
		for(Content u : contents) {
			if(u.getName().equals(name)) {
				return u.getId();
			}
		}
		return -1;
	}
	
	public void update(int id, Content content) {
		for(Content u : contents) {
			if(u.getId() == id) {
				u.setDescription(content.getDescription());
				u.setName(content.getName());
				u.setType(content.getType());
			}
		}
		try {
			toJSON(pathToFile+"contents.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
	
	public void addTraining(int id, int trainingId) {
		for(Content c: contents) {
			if(c.getId() == id) {
				c.addTrainingId(trainingId);
			}
		}
		try {
			toJSON(pathToFile+"contents.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
}
