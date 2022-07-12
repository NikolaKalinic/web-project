package dao;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.xml.bind.ParseConversionEvent;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import Personal.PersonalConfig;
import beans.Content;
import beans.SportObject;
import beans.Training;
import dto.SearchTrainingDTO;

public class TrainingDAO {

	private int trainingId = 106;
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
    
    public int create(Training s) throws FileNotFoundException {
		s.setId(getNewId());
		s.setCanceled(false);
		trainings.add(s);
		toJSON(pathToFile+"trainings.json");
		return s.getId();
	}
	
	private int getNewId() {
		if(trainings.isEmpty())
			return 100;
		int maxId = trainings.get(trainings.size() - 1).getId();
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
	
	public ArrayList<Training> getTrainingsByCoach(int id){
		ArrayList<Training> result = new ArrayList<Training>();
		for(Training tr : trainings) {
			if(tr.getCoach() == id) {
				result.add(tr);
			}
		}
		if(result.isEmpty()) {
			return null;
		} else {
			return result;
		}
	}

	public ArrayList<Training> filterObjType(String type,SportObjectDAO daoObj){
		ArrayList<Training> retVal = new ArrayList<Training>();
		for(Training t: trainings) {
			if(daoObj.getById(t.getSportObject())!=null && daoObj.getById(t.getSportObject()).getType().toString().equals(type)) {
				retVal.add(t);
			}
		}
		return retVal;
	}
	
	private Date getDate(String date) throws ParseException {
//		int year = Integer. parseInt(date.split(".")[1].split(".")[1]);
//		int mounth = Integer. parseInt(date.split(".")[1].split(".")[0]);
//		int day = Integer. parseInt(date.split(".")[0]);
//		return new Date(year,mounth,day); 
	    Date date1=new SimpleDateFormat("dd.MM.yyyy").parse(date); 
	    return date1;
	}
	public ArrayList<Training> search(SearchTrainingDTO dto) throws ParseException{
		ArrayList<Training> retVal = new ArrayList<Training>();
		for(Training t: trainings) {
			if(!dto.getThan().equals("") && !dto.getTo().equals("") && t.getDateTime() !=null) {
				Date than = getDate(dto.getThan());
				Date to = getDate(dto.getTo());
				if(t.getName().toLowerCase().startsWith(dto.getName().toLowerCase()) &&
						t.getDateTime().after(than) && t.getDateTime().before(to)) {
					retVal.add(t);
				}
			}else if(!dto.getThan().equals("") && t.getDateTime() !=null){
				Date than = getDate(dto.getThan());
				if(t.getDateTime().after(than) && t.getName().toLowerCase().startsWith(dto.getName().toLowerCase())) {
					retVal.add(t);
				}
			}else if( !dto.getTo().equals("") && t.getDateTime() !=null) {
				Date to = getDate(dto.getTo());
				if(t.getDateTime().before(to) && t.getName().toLowerCase().startsWith(dto.getName().toLowerCase())) {
					retVal.add(t);
				}
			}
			else {
				if(t.getName().toLowerCase().startsWith(dto.getName().toLowerCase()))
						retVal.add(t);
			}
		}
		return retVal;
	}
	public ArrayList<Training> filterType(String type){
		ArrayList<Training> retVal = new ArrayList<Training>();
		for(Training t: trainings) {
			if(t.getType().toString().equals(type)) {
				retVal.add(t);
			}
		}
		return retVal;
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
	
	public void cancelTraining(int id) {
		for(Training s: trainings) {
			if(s.getId() == id) {
				s.setCanceled(true);
			}
		}
		try {
			toJSON(pathToFile+"trainings.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
    
}
