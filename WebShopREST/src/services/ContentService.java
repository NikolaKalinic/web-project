package services;

import java.io.FileNotFoundException;
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

import beans.Content;
import beans.MembershipFee;
import dao.ContentDAO;
import dao.SportObjectDAO;
import dao.UserDAO;

@Path("/contents")
public class ContentService {
	@Context
	ServletContext ctx;
	
	public ContentService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("contentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("contentDAO", new ContentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Content> getAll() {
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/exists/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response checkDoesExists(@PathParam("name") String name) {
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		if(dao.checkDoesExists(name)) {
			return Response.status(400).entity("Name already exists.").build();
		}else {
			return Response.status(200).build();
		}
	}
	
	@GET
	@Path("/name-{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public int getContentIdByName(@PathParam("name") String name) {
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		return dao.getContentIdByName(name);
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Content getById(@PathParam("id") int id) {
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public void create(Content s) throws FileNotFoundException {
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		dao.create(s);
	}
	
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");
		dao.deleteById(id);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("id") int id, Content content) {		
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");		
		dao.update(id, content);		
		
	}
	@PUT
	@Path("/contentId-{id}/trainingId-{trainingId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addTraining(@PathParam("id") int id, @PathParam("trainingId") int trainingId) {		
		ContentDAO dao = (ContentDAO) ctx.getAttribute("contentDAO");		
		dao.addTraining(id, trainingId);		
		
	}
}
