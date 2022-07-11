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
import javax.ws.rs.core.Response;

import beans.MembershipFee;
import beans.TrainingHistory;
import beans.User;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("/users")
public class UserService {

	@Context
	ServletContext ctx;
	
	public UserService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAll() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getByUsername(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getByUsername(username);
	}
	
	@GET
	@Path("/id={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getById(@PathParam("id") int id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/object={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getUsersByObject(@PathParam("id") int id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getUsersByObject(id);
	}
	@GET
	@Path("/objId={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getCoachByObject(@PathParam("id") int id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		SportObjectDAO daoObj = (SportObjectDAO) ctx.getAttribute("sportObjectDAO");
		
		return dao.getCoachByObject(daoObj.getById(id));
	}
	@GET
	@Path("/freeManager")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getFreeManagers(){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getFreeManagers();
	}
	
	@GET
	@Path("/coaches")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getCoaches(){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getCoaches();
	}
	
	@GET
	@Path("/exists/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response checkDoesExists(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		if(dao.checkDoesExists(username)) {
			return Response.status(400).entity("Username already exists.").build();
		}else {
			return Response.status(200).build();
		}
	}
	
	@GET
	@Path("/userByTrainingId-{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCustomerNameByTrainingId(@PathParam("id") int id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getCustomerNameByTrainingId(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void create(User u) throws FileNotFoundException {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.create(u);
	}
	
	@DELETE
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteByUsername(@PathParam("username") String username) throws FileNotFoundException {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.deleteByUsername(username);
	}
	
	@PUT
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(@PathParam("username") String username,User newUser) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		if(dao.checkDoesExistsWithoutCurrentUsername(newUser.getUsername(), username))
			return Response.status(400).entity("Username already exists.").build();
		else {
			dao.update(username, newUser);
			System.out.println("USAO SAM OVDE");
			return Response.status(200).build();
		}	
	}
	@PUT
	@Path("/sportObjId={id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateSportObjectId(@PathParam("id") int id) throws FileNotFoundException {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.updateSportObjectId(id);
	}
	
	@PUT
	@Path("/fee-{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("username") String username, MembershipFee membershipFee) {
		System.out.println(membershipFee.getType().toString());
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");		
		dao.updateMembershipFee(username, membershipFee);		
		
	}
	
	@PUT
	@Path("/trainingHistory-{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("username") String username, TrainingHistory trh) {
		
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");		
		dao.updateTrainingHistory(username, trh);		
		
	}
	
	@PUT
	@Path("/trainings-{id}-{trainingId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("id") int id, @PathParam("trainingId") int trainingId) {
		
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");		
		dao.updateTrainings(id, trainingId);		
		
	}
	
	@PUT
	@Path("/{objId}/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateObjectForManager(@PathParam("objId") int objId, @PathParam("userId") int userId) throws FileNotFoundException {	
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");		
		dao.updateObjectForManager(objId, userId);		
		
	}
}
