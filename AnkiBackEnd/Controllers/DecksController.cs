using AnkiBackEnd.Data.DTOs;
using AnkiBackEnd.Data.Models;
using AnkiBackEnd.Interfaces;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnkiBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecksController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriService _uriService;
        readonly IHttpContextAccessor _httpContextAccessor;

        public DecksController(AppDBContent context, IUriService uriService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _uriService = uriService;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET: api/Cards
        [HttpGet("/profile/decks")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<Deck>>> GetDecks([FromQuery] PaginationFilter filter, string topic)
        {
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var decks = FiltrationService.FiltrationDecks(_context, topic);
            var route = Request.Path.Value;
            var totalRecords = decks.ToList().Count();
            var decksList = decks.Include(c => c.User)
                .Where(c => c.User.Id == currentUserId)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).ToList();
            var pagedResponse = PaginationHelper<Deck>.CreatePagedReponse(decksList, filter, totalRecords, _uriService, route);
            return Ok(pagedResponse);
        }

        // GET: api/Cards/5

        //Под вопросом надо или нет

        [HttpGet]
        [Route("/profile/decks/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Deck>> GetDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var deck = await _context.Decks.Include(d => d.Cards).FirstOrDefaultAsync(d=>d.Id ==id);

            if (deck == null)
            {
                return NotFound();
            }

            return deck;
        }

        [HttpPut("/profile/decks/update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> PutDeck(int id, Deck deck)
        {
            if (id != deck.Id)
            {
                return BadRequest();
            }

            _context.Entry(deck).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DeckExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Problems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("/profile/decks/new")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Card>> PostDeck([FromBody]DeckDTO deckDTO)
        {
            var deck = new Deck()
            {
                Cards = deckDTO.Cards,
                IsPrivate = false,
                IsSharedForAll = false,
                IsSharedFromLink = false,
                Topic = deckDTO.Topic
            };
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUser = await _context.Users.FirstOrDefaultAsync(o => o.Id == currentUserId);

            _context.Entry(currentUser).State = EntityState.Modified;

            currentUser.Decks.Add(deck);

            if (_context.Decks == null)
            {
                return Problem("Entity set 'AppDBContent.Things'  is null.");
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProblem", new { id = deck.Id }, deck);
        }

        // DELETE: api/Problems/5
        [HttpDelete("/profile/decks/delete/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> DeleteDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var deck = await _context.Decks.FindAsync(id);
            if (deck == null)
            {
                return NotFound();
            }

            _context.Decks.Remove(deck);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("/profile/decks/shareforall/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ShareDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var deck = await _context.Decks.FindAsync(id);
            if (deck == null)
            {
                return NotFound();
            }
            _context.Entry(deck).State = EntityState.Modified;
            deck.IsSharedForAll = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("/profile/decks/sharefromlink/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> ShareFromLinkDeck(int id)
        {
            if (_context.Decks == null)
            {
                return NotFound();
            }
            var deck = await _context.Decks.FindAsync(id);
            if (deck == null)
            {
                return NotFound();
            }

            deck.IsSharedFromLink = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DeckExists(int id)
        {
            return (_context.Cards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
