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
import beans.SportObject;
import beans.TrainingHistory;
import beans.User;
import dto.SearchObjectDTO;
import dto.SearchUserDTO;
import enums.Role;

public class UserDAO {
	private ArrayList<User> users;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type USERS_TYPE = new TypeToken<ArrayList<User>>() {
    }.getType();
    private static Gson g = new Gson();
	
	
	public UserDAO(String contextPath) {
		users = new ArrayList<User>();
		try {
            File file = new File(pathToFile+"users.json");
            JsonReader reader = new JsonReader(new FileReader(file));
            users = g.fromJson(reader, USERS_TYPE);
        } catch (Exception e) {
            e.printStackTrace();
        }
		
	}
	
	private void toJSON(String filename) throws FileNotFoundException {
        PrintWriter out = new PrintWriter(filename);
        out.printf(g.toJson(users));
        out.close();
    }
	
	public void create(User u) throws FileNotFoundException {
		u.setId(getNewId());
		users.add(u);
		toJSON(pathToFile+"users.json");
	}
	
	private int getNewId() {
		if(users.isEmpty())
			return 100;
		int maxId = users.get(0).getId();
		for(User so : users) {
			if(maxId < so.getId()) {
				maxId = so.getId();
			}
		}
		return maxId+1;
	}
	
	public ArrayList<User> getAll(){
		return users;
	}
	
	public User getById(int id) {
		for(User u :users) {
			if(u.getId()==id) {
				return u;
			}
		}
		return null;
	}
	
	public ArrayList<User> getUsersByObject(int objectId){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u : users) {
			if(u.getVisitedObject() != null) {
				for(int id : u.getVisitedObject()) {
					if(id == objectId) {
						retVal.add(u);
					}
				}
			}
		}
		return retVal;
	}
	
	public ArrayList<User> 	getCoachByObject( SportObject object){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u : users) {
			if(object.getCoachWhoWorks() != null) {
				for(int i : object.getCoachWhoWorks()) {
					if(i == u.getId()) {
						retVal.add(u);
					}
				}
			}
		}
		return retVal;
	}
	public ArrayList<User> filterRole(Role role){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u : users) {
			if(u.getRole() == role) {
				retVal.add(u);
			}
		}
		return retVal;
	}
	public ArrayList<User> getFreeManagers(){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u: users) {
			if(u.getRole()==Role.Manager && u.getSportObjectId()==0) {
				retVal.add(u);
			}
		}
		return retVal;
	}
	
	public ArrayList<User> getCoaches(){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u: users) {
			if(u.getRole() == Role.Coach) {
				retVal.add(u);
			}
		}
		return retVal;
	}
	
	public User getByUsername(String username) {
		for(User u : users) {
			if(u.getUsername().equals(username))
				return u;
		}
		return null;
	}
	
	public void deleteByUsername(String username) throws FileNotFoundException {
		for(int i = 0; i<users.size();i++) {
			if(users.get(i).getUsername().equals(username)) {
				users.remove(i);
				toJSON(pathToFile+"users.json");
			}
		}
	}
	
	public User find(String username, String password) {
		if(checkDoesExists(username)) {
			User user = getByUsername(username);
			if(user.getPassword().equals(password)) {
				return user;
			}
			else
				return null;
		}else {
			return null;
		}
	}
	
	public ArrayList<User> search(SearchUserDTO dto){
		ArrayList<User> retVal = new ArrayList<User>();
		for(User u: users) {
			if(u.getFirstName().toLowerCase().startsWith(dto.getSearchName().toLowerCase())   &&
			   u.getLastName().toLowerCase().startsWith(dto.getSearchSurname().toLowerCase()) &&
			   u.getUsername().toLowerCase().startsWith(dto.getSearchUsername().toLowerCase())) {
				retVal.add(u);				
			}
		}
		return retVal;
	}
	public boolean checkDoesExists(String username) {
		boolean exists = false;
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				exists=true;
			}
		}
		return exists;
	}
	
	public boolean checkDoesExistsWithoutCurrentUsername(String newUsername, String oldUsername) {
		boolean exists = false;		
		for(User u : users) {
	
			if(u.getUsername().equals(oldUsername)) {				
				break;
			} else if(u.getUsername().equals(newUsername)) {
				exists = true;				
			}
		}
		return exists;
	}
	
	public void updateSportObjectId(int id) throws FileNotFoundException {
		for(User u: users) {
			if(u.getSportObjectId()==id) {
				u.setSportObjectId(0);
			}
		}
		toJSON(pathToFile+"users.json");
	}
	public void update(String username,User newUser) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				u.setUsername(newUser.getUsername());
				u.setDateOfBirth(newUser.getDateOfBirth());
				u.setEmail(newUser.getEmail());
				u.setFirstName(newUser.getFirstName());
				u.setLastName(newUser.getLastName());
				u.setGender(newUser.getGender());
				u.setPassword(newUser.getPassword());				
				//DODATI JOS STVARI OVDE PO POTREBI I ZASTITI NA FRONTU NEKE PROMENE
			}
		}
		try {
			toJSON(pathToFile+"users.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
	
	
	
	public void updateMembershipFee(String username, MembershipFee membershipFee) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				u.setMembershipFee(membershipFee);
			}
		}
		try {
			toJSON(pathToFile+"users.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
	
	public void updateTrainingHistory(String username, TrainingHistory trh) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				u.addTrainingHistory(trh);
			}
		}
		try {
			toJSON(pathToFile+"users.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
	
	public void updateTrainings(int id, int trainingId) {
		for(User u : users) {
			if(u.getId() == id) {
				u.addTraining(trainingId);
			}
		}
		try {
			toJSON(pathToFile+"users.json");
		}catch (Exception e) {
			// TODO: handle exception
			System.out.println("NIsam uspeo update");
		}
	}
	
	public String getCustomerNameByTrainingId(int trainingId) {
		for(User u : users) {
			for(int t : u.getTrainingId()) {
				if(t == trainingId) {
					return u.getFirstName() + " " + u.getLastName();
				}
			}
		}		
		return null;
	}
	
	public void updateObjectForManager(int objId,int userId) throws FileNotFoundException {
		for(User u: users) {
			if(u.getId()==userId) {
				u.setSportObjectId(objId);
				toJSON(pathToFile+"users.json");
			}
		}
	}
	
}
