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
import beans.Address;
import beans.Location;
import beans.SportObject;
import enums.SportObjectType;
import enums.StatusSportObject;
import fileHandler.GenericFileHandler;

public class SportObjectDAO {

	private ArrayList<SportObject> sportObjects;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private GenericFileHandler<SportObject> fileHandler = new GenericFileHandler<SportObject>();
	private static final java.lang.reflect.Type SPORTOBJECTS_TYPE = new TypeToken<ArrayList<SportObject>>() {
    }.getType();
    private static Gson g = new Gson();
	
	public SportObjectDAO(String contextPath) {
//		 try {
//			 //sportObjects = fileHandler.load("sportsObjects.txt");
//		 }catch(Exception e) {
//		 }
		 sportObjects = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"sportsObjects.json");
	            System.out.println(file.getCanonicalPath());
	            JsonReader reader = new JsonReader(new FileReader(file));
	            ArrayList<SportObject> tmp = g.fromJson(reader, SPORTOBJECTS_TYPE);
	            sportObjects = tmp;
	            
	            for(SportObject s : sportObjects) {
	            	System.out.println(s.getName());
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
//		 try {
//		 Address a = new Address("kosovska","123","as","as","sa");
//		 Location l = new Location(124,214,a);
//	create(new SportObject("Pero",SportObjectType.DanceStudio,"Gym",StatusSportObject.Close,l,4,"07-22"));
//		 }catch (Exception e) {
//			// TODO: handle exception
//		}
	
	
	private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        //System.out.println(filename);
        out.printf(g.toJson(sportObjects));
        out.close();
    }
//	public void addSportObject(SportObject sportObject) throws FileNotFoundException {
//        sportObjects.put(sportObject.getId(), sportObject);
//        toJSON(path + "/resources/JSON/sportObjects.json");
//    }
	public void create(SportObject s) throws FileNotFoundException {
		s.setId(getNewId());
		sportObjects.add(s);
		toJSON(pathToFile+"sportsObjects.json");
//		fileHandler.save(sportObjects, "sportsObjects.txt");
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
	
	public void deleteById(int id) {
		for(int i = 0; i<sportObjects.size();i++) {
			if(sportObjects.get(i).getId() == id) {
				sportObjects.remove(i);
				fileHandler.save(sportObjects, "sportsObjects.txt");
			}
		}
	}
}
