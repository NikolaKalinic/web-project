package dao;


import java.util.ArrayList;

import beans.User;
import fileHandler.GenericFileHandler;

public class UserDAO {
	private ArrayList<User> users;
	private GenericFileHandler<User> fileHandler = new GenericFileHandler<User>();
	
	
	public UserDAO(String contextPath) {
		 try {
			 users = fileHandler.load("users.txt");
		 }catch(Exception e) {
			 users = new ArrayList<>();
		 }
	}
	
	public void create(User u) {
		users.add(u);
		fileHandler.save(users, "users.txt");
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
	
	public void deleteByUsername(String username) {
		for(int i = 0; i<users.size();i++) {
			if(users.get(i).getUsername().equals(username)) {
				users.remove(i);
				fileHandler.save(users, "users.txt");
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
	
	private boolean checkDoesExists(String username) {
		boolean exists = false;
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				exists=true;
			}
		}
		return exists;
	}
	
}
