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

import beans.MembershipFee;
import beans.PromoCode;
import dao.MembershipFeeDAO;
import dao.PromoCodeDAO;

@Path("/membership-fee")
public class MembershipFeeService {
	
	@Context
	ServletContext ctx;
	
	public MembershipFeeService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("membershipFeeDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("membershipFeeDAO", new MembershipFeeDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<MembershipFee> getAll() {
		MembershipFeeDAO dao = (MembershipFeeDAO) ctx.getAttribute("membershipFeeDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public MembershipFee getById(@PathParam("id") String id) {
		MembershipFeeDAO dao = (MembershipFeeDAO) ctx.getAttribute("membershipFeeDAO");
		return dao.getById(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public void create(MembershipFee s) throws FileNotFoundException {
		MembershipFeeDAO dao = (MembershipFeeDAO) ctx.getAttribute("membershipFeeDAO");
		dao.create(s);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteById(@PathParam("id") String id) throws FileNotFoundException{
		MembershipFeeDAO dao = (MembershipFeeDAO) ctx.getAttribute("membershipFeeDAO");
		dao.deleteById(id);
	}
}
