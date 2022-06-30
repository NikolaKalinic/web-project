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
import beans.TrainingHistory;

public class TrainingHistoryDAO {

	private ArrayList<TrainingHistory> trainingHistories;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type HISTORY_TYPE = new TypeToken<ArrayList<TrainingHistory>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public TrainingHistoryDAO(String contextPath) {
    	trainingHistories = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"trainingHistories.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            trainingHistories = g.fromJson(reader, HISTORY_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(trainingHistories));
        out.close();
    }
    
    public void create(TrainingHistory s) throws FileNotFoundException {
		s.setId(getNewId());
		trainingHistories.add(s);
		toJSON(pathToFile+"trainingHistories.json");
	}
	
	private int getNewId() {
		if(trainingHistories.isEmpty())
			return 100;
		int maxId = trainingHistories.get(0).getId();
		for(TrainingHistory so : trainingHistories) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<TrainingHistory> getAll(){
		return trainingHistories;
	}
	
	public TrainingHistory getById(int wantedId) {
		for(TrainingHistory s : trainingHistories) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<trainingHistories.size();i++) {
			if(trainingHistories.get(i).getId() == id) {
				trainingHistories.remove(i);
				toJSON(pathToFile+"trainingHistories.json");
			}
		}
	}
}
