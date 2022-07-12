package services;

import java.io.FileNotFoundException;
import java.text.ParseException;
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

import beans.MembershipFee;
import beans.SportObject;
import beans.Training;
import dao.SportObjectDAO;
import dao.TrainingDAO;
import dao.UserDAO;
import dto.SearchObjectDTO;
import dto.SearchTrainingDTO;

@Path("/trainings")
public class TrainingService {

	@Context
	ServletContext ctx;
	
	public TrainingService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("trainingDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("trainingDAO", new TrainingDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getAll() {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Training getById(@PathParam("id") int id) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getById(id);
	}

	@GET
	@Path("/filterType/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> filterType(@PathParam("type") String type){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		if(type.equals("None"))
			return getAll();
		else
			return dao.filterType(type);
	}
	@GET
	@Path("/filterObj/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> filterObjType(@PathParam("type") String type){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		SportObjectDAO daoObj = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		if(type.equals("None"))
			return getAll();
		else
			return dao.filterObjType(type,daoObj);
	}
	@GET
	@Path("/getByCoach-{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainingsByCoach(@PathParam("id") int id){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getTrainingsByCoach(id);
	}
	
	@PUT
	@Path("/cancel-{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void cancelTraining(@PathParam("id") int id) {		
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");		
		dao.cancelTraining(id);	
		
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public int create(Training s) throws FileNotFoundException {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.create(s);
	}
	
	@PUT
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Training> search(SearchTrainingDTO dto) throws ParseException{
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.search(dto);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		dao.deleteById(id);
	}
}
