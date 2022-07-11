package services;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import beans.SportObject;
import dao.ProductDAO;
import dao.SportObjectDAO;
import dto.SearchObjectDTO;
import enums.SportObjectType;

import dao.UserDAO;

@Path("/objects")
public class SportObjectsService {

	@Context
	ServletContext ctx;
	
	public SportObjectsService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("sportObjectDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("sportObjectDAO", new SportObjectDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportObject> getAll() {
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return dao.getAll();
	}
	
	
	@GET
	@Path("/filter/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportObject> filter(@PathParam("type") String type) {
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		if(type.equals(SportObjectType.None.toString())) {
			return getAll();
		}
		else
			return dao.filter(type);
	}
	@GET
	@Path("/filterOpen")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportObject> filterOpen(@PathParam("type") String type) {
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
			return dao.filterOpen();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public SportObject getById(@PathParam("id") int id) {
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public int create(SportObject s) throws FileNotFoundException {
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return dao.create(s);
	}
	
	@PUT
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<SportObject> search(SearchObjectDTO dto){
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		return dao.search(dto);
	}
	
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		dao.deleteById(id);
	}
	
	@PUT
	@Path("/addContent-{id}/{objectId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("objectId") int objectId, @PathParam("id") int id) {
		System.out.println("objekat" + objectId);
		System.out.println("kontent" + id);
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");		
		dao.addContent(objectId, id);		
		
	}
	
	@DELETE
	@Path("/deleteContent-{id}/{objectId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteContent(@PathParam("objectId") int objectId, @PathParam("id") int id) {
		System.out.println("objekat" + objectId);
		System.out.println("kontent" + id);
		SportObjectDAO dao = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");		
		dao.deleteContent(objectId, id);		
		
	}
}
