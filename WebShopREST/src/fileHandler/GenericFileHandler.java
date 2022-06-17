package fileHandler;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;

import Personal.PersonalConfig;

public class GenericFileHandler<T> implements Serializable {

	private String pathToFile = PersonalConfig.PROJECT_FOLDER_PATH + "\\WebContent\\";
	
	public GenericFileHandler() {
	}
	
	public void save(ArrayList<T> lists, String fileName) {
		File f = new File(pathToFile + fileName);
		try {
			f.createNewFile();
			ObjectOutputStream oos = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream(f)));
			try {
				oos.writeObject(lists);
			} finally {
				oos.close(); //Zatvara i tok nizeg nivoa.
			}
		}catch(Exception e) {
			System.out.println("Nisam uspeo");
			System.out.println(e.getMessage());
		}
	}
	
	public ArrayList<T> load(String fileName){
		File f = new File(pathToFile+fileName);
		ArrayList<T> items = new ArrayList<>();
		try {
			ObjectInputStream ois = new ObjectInputStream(new BufferedInputStream(new FileInputStream(f)));
			try {
				items = (ArrayList<T>)ois.readObject();
				
			} finally {
				ois.close();
			}
		}catch(Exception e) {
			System.out.println("Nisam ucitao");
			System.out.println(e.getMessage());
			items = new ArrayList<T>();
		}
		return items;
	}
}
