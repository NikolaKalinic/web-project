package services;

import java.io.FileNotFoundException;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import beans.SportObject;
import dao.CommentDAO;
import dao.SportObjectDAO;

@Path("/comments")
public class CommentService {

	@Context
	ServletContext ctx;
	
	public CommentService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("commentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("commentDAO", new CommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getAll() {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/object={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getByObjectId(@PathParam("id") int id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getByObjectId(id);
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Comment getById(@PathParam("id") int id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public void create(Comment s) throws FileNotFoundException {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.create(s);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.deleteById(id);
	}
	
	@PUT
	@Path("/reject={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment>reject(@PathParam("id") int id) throws FileNotFoundException{
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.reject(id);
	}
	
	@PUT
	@Path("/accept={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> accept(@PathParam("id") int id) throws FileNotFoundException{
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.accept(id);
	}
}
