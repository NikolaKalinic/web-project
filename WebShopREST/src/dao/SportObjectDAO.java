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
import beans.SportObject;


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

	public void create(SportObject s) throws FileNotFoundException {
		s.setId(getNewId());
		sportObjects.add(s);
		toJSON(pathToFile+"sportsObjects.json");
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
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<sportObjects.size();i++) {
			if(sportObjects.get(i).getId() == id) {
				sportObjects.remove(i);
				toJSON(pathToFile+"sportsObjects.json");
			}
		}
	}
}
