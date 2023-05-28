using AnkiBackEnd.Data.DTOs;
using AnkiBackEnd.Data.Models;
using AnkiBackEnd.Interfaces;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace AnkiDiplom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriService _uriService;

        public CardsController(AppDBContent context, IUriService uriService)
        {
            _context = context;
            _uriService = uriService;
        }

        // GET: api/Cards
        [HttpGet("/profile/{id}/cards")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards(int id)
        {
            var cards = _context.Cards.Include(c => c.Deck)
                .Where(c => c.Deck.Id == id);
            return Ok(cards);
        }

        [HttpGet("/sharedDeck/{id}/cards")]
        public async Task<ActionResult<IEnumerable<Card>>> GetSharedDeckCards(int id)
        {
            var cards = _context.Cards.Include(c => c.Deck)
                .Where(c => c.Deck.Id == id);
            var cardsList = cards.ToList();
            return Ok(cards);
        }

        // GET: api/Cards/5
        [HttpGet("/profile/{Deck.Topic}/cards/{id}")]
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

        [HttpPut("/profile/{Deck.Topic}/cards/update/{id}")]
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
        [HttpPost("/profile/{idDeck}/cards/new")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Card>> PostCard(int idDeck, CardDTO cardDTO)
        {
            var card = new Card()
            {
                Question = cardDTO.Question,
                Answer = cardDTO.Answer,
                Topic = cardDTO.Topic,
                IsFavorite = cardDTO.IsFavorite,
            };

            var deck = await _context.Decks.FirstOrDefaultAsync(d=>d.Id == idDeck);
            _context.Entry(deck).State = EntityState.Modified;
            deck.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProblem", new { id = card.Id }, card);
        }

        // DELETE: api/Problems/5
        [HttpDelete("/profile/cards/delete/{id}")]
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
