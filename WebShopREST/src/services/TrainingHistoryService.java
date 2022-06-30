package services;

import java.io.FileNotFoundException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Training;
import beans.TrainingHistory;
import dao.TrainingDAO;
import dao.TrainingHistoryDAO;

@Path("/history")
public class TrainingHistoryService {

	@Context
	ServletContext ctx;
	
	public TrainingHistoryService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("historyDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("historyDAO", new TrainingHistoryDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getAll() {
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("historyDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public TrainingHistory getById(@PathParam("id") int id) {
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("historyDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public void create(TrainingHistory s) throws FileNotFoundException {
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("historyDAO");
		dao.create(s);
	}
	
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("historyDAO");
		dao.deleteById(id);
	}
}
