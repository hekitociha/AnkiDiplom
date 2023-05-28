using AnkiBackEnd.Data.Models;
using AnkiBackEnd.Interfaces;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AnkiBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedDecksController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriService _uriService;
        readonly IHttpContextAccessor _httpContextAccessor;

        public SharedDecksController(AppDBContent context, IUriService uriService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _uriService = uriService;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Cards
        [HttpGet("/sharedDecks")]
        public async Task<ActionResult<IEnumerable<Deck>>> GetSharedDecks()
        {
            var decksList = _context.Decks.Include(d => d.User).Where(d=>d.IsSharedForAll);
            return Ok(decksList);
        }

        [HttpGet("/sharedDecks/{id}")]
        public async Task<ActionResult<Deck>> GetSharedFromLinkDeck(int id)
        {
            var deck = await _context.Decks.Include(d => d.Cards)
                .FirstOrDefaultAsync(d => d.Id == id && d.IsSharedForAll);
            return Ok(deck);
        }

        [HttpGet("/sharedDecks/add/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Deck>> AddSharedFromLinkDeck(int id)
        {
            //var Id = int.Parse(id);
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var deck = _context.Decks.First(d => d.Id == id);
            var currentUser = await _context.Users.FirstOrDefaultAsync(o => o.Id == currentUserId);
            _context.Entry(currentUser).State = EntityState.Modified;
            if (currentUser != null && !currentUser.Decks.Contains(deck))
            {
                currentUser.Decks.Add(deck);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
