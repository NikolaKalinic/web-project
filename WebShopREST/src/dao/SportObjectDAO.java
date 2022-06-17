package dao;

import java.util.ArrayList;

import beans.SportObject;
import fileHandler.GenericFileHandler;

public class SportObjectDAO {

	private ArrayList<SportObject> sportObjects;
	private GenericFileHandler<SportObject> fileHandler = new GenericFileHandler<SportObject>();
	
	public SportObjectDAO(String contextPath) {
		 try {
			 sportObjects = fileHandler.load("sportsObjects.txt");
		 }catch(Exception e) {
			 sportObjects = new ArrayList<>();
		 }
	}
	
	public void create(SportObject s) {
		s.setId(getNewId());
		sportObjects.add(s);
		fileHandler.save(sportObjects, "sportsObjects.txt");
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
