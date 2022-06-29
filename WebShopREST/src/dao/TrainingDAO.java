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
import beans.Training;

public class TrainingDAO {

	private ArrayList<Training> trainings;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type TRAINING_TYPE = new TypeToken<ArrayList<Training>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public TrainingDAO(String contextPath) {
    	trainings = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"trainings.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            trainings = g.fromJson(reader, TRAINING_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(trainings));
        out.close();
    }
    
    public void create(Training s) throws FileNotFoundException {
		s.setId(getNewId());
		trainings.add(s);
		toJSON(pathToFile+"trainings.json");
	}
	
	private int getNewId() {
		if(trainings.isEmpty())
			return 100;
		int maxId = trainings.get(0).getId();
		for(Training so : trainings) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<Training> getAll(){
		return trainings;
	}
	
	public Training getById(int wantedId) {
		for(Training s : trainings) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<trainings.size();i++) {
			if(trainings.get(i).getId() == id) {
				trainings.remove(i);
				toJSON(pathToFile+"trainings.json");
			}
		}
	}
    
}
