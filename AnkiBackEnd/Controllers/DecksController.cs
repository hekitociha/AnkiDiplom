using AnkiBackEnd.Data.Models;
using AnkiBackEnd.Interfaces;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AnkiBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecksController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriService _uriService;

        public DecksController(AppDBContent context, IUriService uriService)
        {
            _context = context;
            _uriService = uriService;
        }

        // GET: api/Cards
        [HttpGet]
        [Route("/{Deck.Topic}/cards")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<Deck>>> GetDecks([FromQuery] PaginationFilter filter, string topic)
        {
            var decks = FiltrationService.FiltrationDecks(_context, topic);
            var route = Request.Path.Value;
            var cardsCount = decks.ToList();
            decks = decks.Include(c => c.User)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            var cardsList = decks.ToList();
            var totalRecords = cardsCount.Count();
            var pagedResponse = PaginationHelper<Deck>.CreatePagedReponse(cardsList, filter, totalRecords, _uriService, route);
            return Ok(pagedResponse);
        }

        // GET: api/Cards/5
        [HttpGet]
        [Route("/{Deck.Topic}/cards/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Card>> GetCard(int id)
        {
            if (_context.Cards == null)
            {
                return NotFound();
            }
            var card = await _context.Cards.FindAsync(id);

            if (card == null)
            {
                return NotFound();
            }

            return card;
        }

        [HttpPut]
        [Route("/{Deck.Topic}/cards/update/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> PutCard(int id, Card card)
        {
            if (id != card.Id)
            {
                return BadRequest();
            }

            _context.Entry(card).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CardExists(id))
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
        [HttpPost]
        [Route("/{Deck.Topic}/cards/new")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Card>> PostCard(Card card)
        {
            if (_context.Cards == null)
            {
                return Problem("Entity set 'AppDBContent.Things'  is null.");
            }
            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProblem", new { id = card.Id }, card);
        }

        // DELETE: api/Problems/5
        [HttpDelete]
        [Route("/{Deck.Topic}/cards/delete{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> DeleteCard(int id)
        {
            if (_context.Cards == null)
            {
                return NotFound();
            }
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CardExists(int id)
        {
            return (_context.Cards?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
