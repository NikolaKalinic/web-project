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

import beans.PromoCode;
import dao.PromoCodeDAO;
import dao.TrainingDAO;

@Path("/promo-code")
public class PromoCodeService {

	@Context
	ServletContext ctx;
	
	public PromoCodeService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("promoCodeDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("promoCodeDAO", new PromoCodeDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<PromoCode> getAll() {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode getById(@PathParam("id") int id) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		return dao.getById(id);
	}
	@GET
	@Path("/name={name}")
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode getByName(@PathParam("name") String name) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		System.out.println(name);
		return dao.getByName(name);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public void create(PromoCode s) throws FileNotFoundException {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		dao.create(s);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void updateNumberOfTerms(@PathParam("id") int id) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		dao.updateNumberOfTerms(id);
	}
	
	@PUT
	@Path("/delete-{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deletePromoCode(@PathParam("id") int id) {		
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		dao.deletePromoCode(id);	
		
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") int id) throws FileNotFoundException{
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		dao.deleteById(id);
	}
}
