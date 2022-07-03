package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import Personal.PersonalConfig;
import beans.TrainingHistory;
public class TrainingHistoryDAO {

	private ArrayList<TrainingHistory> trainings;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type TRAININGHISTORY_TYPE = new TypeToken<ArrayList<TrainingHistory>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public TrainingHistoryDAO(String contextPath) {
    	trainings = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"trainingHistory.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            trainings = g.fromJson(reader, TRAININGHISTORY_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(trainings));
        out.close();
    }
    
    public void create(TrainingHistory s) throws FileNotFoundException {
		s.setId(getNewId());
		s.setDateTime(new Date());
		trainings.add(s);
		toJSON(pathToFile+"trainingHistory.json");
	}
	
	private int getNewId() {
		if(trainings.isEmpty())
			return 100;
		int maxId = trainings.get(0).getId();
		for(TrainingHistory so : trainings) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<TrainingHistory> getAll(){
		return trainings;
	}
	
	public TrainingHistory getById(int wantedId) {
		for(TrainingHistory s : trainings) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<trainings.size();i++) {
			if(trainings.get(i).getId() == id) {
				trainings.remove(i);
				toJSON(pathToFile+"trainingHistory.json");
			}
		}
	}
}
