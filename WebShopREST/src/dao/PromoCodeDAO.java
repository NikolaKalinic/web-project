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
import beans.PromoCode;

public class PromoCodeDAO {

	private ArrayList<PromoCode> promoCodes;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type CODE_TYPE = new TypeToken<ArrayList<PromoCode>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public PromoCodeDAO(String contextPath) {
    	promoCodes = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"promoCodes.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            promoCodes = g.fromJson(reader, CODE_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(promoCodes));
        out.close();
    }
    
    public void create(PromoCode s) throws FileNotFoundException {
		s.setId(getNewId());
		promoCodes.add(s);
		toJSON(pathToFile+"promoCodes.json");
	}
	
	private int getNewId() {
		if(promoCodes.isEmpty())
			return 100;
		int maxId = promoCodes.get(0).getId();
		for(PromoCode so : promoCodes) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<PromoCode> getAll(){
		return promoCodes;
	}
	
	public PromoCode getById(int wantedId) {
		for(PromoCode s : promoCodes) {
			if(s.getId() == wantedId)
				return s;
		}
		return null;
	}
	
	public void deleteById(int id) throws FileNotFoundException{
		for(int i = 0; i<promoCodes.size();i++) {
			if(promoCodes.get(i).getId() == id) {
				promoCodes.remove(i);
				toJSON(pathToFile+"promoCodes.json");
			}
		}
	}
}
