package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import Personal.PersonalConfig;
import beans.Comment;
import beans.SportObject;
import enums.CommentStatus;


public class SportObjectDAO {

	private ArrayList<SportObject> sportObjects;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type SPORTOBJECTS_TYPE = new TypeToken<ArrayList<SportObject>>() {
    }.getType();
    private static Gson g = new Gson();
	
	public SportObjectDAO(String contextPath) {
		 sportObjects = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"sportsObjects.json");
	            System.out.println("-----------------------------------------------------");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            ArrayList<SportObject> tmp = g.fromJson(reader, SPORTOBJECTS_TYPE);
	            sportObjects = tmp;
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
	
	private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(sportObjects));
        out.close();
    }

	public int create(SportObject s) throws FileNotFoundException {
		s.setId(getNewId());
		sportObjects.add(s);
		toJSON(pathToFile+"sportsObjects.json");
		return s.getId();
	}
	
	private int getNewId() {
		if(sportObjects.isEmpty())
			return 100;
		int maxId = sportObjects.get(0).getId();
		for(SportObject so : sportObjects) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<SportObject> getAll(){
		return sportObjects;
	}
	
	public SportObject getById(int wantedId) {
		for(SportObject s : sportObjects) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public ArrayList<SportObject> getSearch(String name, String type, String location, String averageRating){
		ArrayList<SportObject> searchedObjects = new ArrayList<SportObject>();
		for(SportObject so : getAll()) {
			if(so.getName().toLowerCase().startsWith(name.toLowerCase()) && so.getType().toString().toLowerCase().startsWith(type.toLowerCase()) && 
			so.getLocation().getAddress().getState().toLowerCase().startsWith(location.toLowerCase()) && String.valueOf(so.getAverageRating()).startsWith(averageRating)) {
				searchedObjects.add(so);
			}
		}
		return searchedObjects;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<sportObjects.size();i++) {
			if(sportObjects.get(i).getId() == id) {
				sportObjects.remove(i);
				toJSON(pathToFile+"sportsObjects.json");
			}
		}
	}
	
	public void calculateMark(Collection<Comment> comments) throws FileNotFoundException {
		int objId = ((ArrayList<Comment>)comments).get(0).getSportObjectId();
		if(comments.isEmpty()) {
			updateNewAvgMark(objId,0);
			return;
		}
		double sum=0;
		int cnt=0;
		for(Comment c : comments) {
			if(c.getStatus() == CommentStatus.Accepted) {
				System.out.println("-----");
				System.out.println("ID="+c.getId());
				System.out.println("MARK="+c.getMark());
				cnt++;
				sum+=c.getMark();
			}
		}
		updateNewAvgMark(objId,sum/cnt);
	}
	
	private void updateNewAvgMark(int objId,double mark) throws FileNotFoundException {
		for(SportObject s : sportObjects) {
			if(s.getId()==objId) {
				s.setAverageRating(mark);
				toJSON(pathToFile+"sportsObjects.json");
				return;
			}
		}
	}
}
