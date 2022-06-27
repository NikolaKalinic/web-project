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
import beans.User;

public class UserDAO {
	private ArrayList<User> users;
	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	private static final java.lang.reflect.Type USERS_TYPE = new TypeToken<ArrayList<User>>() {
    }.getType();
    private static Gson g = new Gson();
	
	
	public UserDAO(String contextPath) {
		users = new ArrayList<>();
		try {
            File file = new File(pathToFile+"users.json");
            JsonReader reader = new JsonReader(new FileReader(file));
            ArrayList<User> tmp = g.fromJson(reader, USERS_TYPE);
            users = tmp;
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
		users.add(u);
		toJSON(pathToFile+"users.json");
	}
	
	public ArrayList<User> getAll(){
		return users;
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
	
	public boolean checkDoesExists(String username) {
		boolean exists = false;
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				exists=true;
			}
		}
		return exists;
	}
	
}
