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
import beans.MembershipFee;
import beans.PromoCode;

public class MembershipFeeDAO {
	private ArrayList<MembershipFee> membershipFies;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type CODE_TYPE = new TypeToken<ArrayList<MembershipFee>>() {
    }.getType();
    private static Gson g = new Gson();
    
    public MembershipFeeDAO(String contextPath) {
    	membershipFies = new ArrayList<>();
		 try {
	            File file = new File(pathToFile+"membershipFies.json");
	            JsonReader reader = new JsonReader(new FileReader(file));
	            membershipFies = g.fromJson(reader, CODE_TYPE);
	          
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	}
    
    private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(membershipFies));
        out.close();
    }
    
    public void create(MembershipFee s) throws FileNotFoundException {
		s.setId(getAlphaNumericString(10));
		membershipFies.add(s);
		toJSON(pathToFile+"membershipFies.json");
	}
    private String getAlphaNumericString(int n)
    {
  
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                    + "0123456789"
                                    + "abcdefghijklmnopqrstuvxyz";
  
        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);
  
        for (int i = 0; i < n; i++) {
  
            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                = (int)(AlphaNumericString.length()
                        * Math.random());
  
            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                          .charAt(index));
        }
        
        return sb.toString();
    }
	
	
	public ArrayList<MembershipFee> getAll(){
		return membershipFies;
	}
	
	public MembershipFee getById(String wantedId) {
		for(MembershipFee s : membershipFies) {
			if(s.getId().equals(wantedId))
				return s;
		}
		return null;
	}
	
	public void deleteById(String id) throws FileNotFoundException{
		for(int i = 0; i<membershipFies.size();i++) {
			if(membershipFies.get(i).getId().equals(id)) {
				membershipFies.remove(i);
				toJSON(pathToFile+"membershipFies.json");
			}
		}
	}
}
