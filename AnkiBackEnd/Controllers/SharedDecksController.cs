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
        public async Task<ActionResult<IEnumerable<Deck>>> GetSharedDecks([FromQuery] PaginationFilter filter, string topic)
        {
            var decks = FiltrationService.FiltrationDecks(_context, topic);
            var route = Request.Path.Value;
            var totalRecords = decks.ToList().Count();
            var decksList = decks.Include(c => c.User)
                .Where(d => d.IsSharedForAll)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize).ToList();
            var pagedResponse = PaginationHelper<Deck>.CreatePagedReponse(decksList, filter, totalRecords, _uriService, route);
            return Ok(pagedResponse);
        }

        [HttpGet("/sharedDecks/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Deck>> GetSharedFromLinkDeck(int deckId)
        {
            var deck = _context.Decks.Include(c => c.User)
                .First(d => d.Id == deckId);
            return Ok(deck);
        }

        [HttpGet("/sharedDecks/add/{id}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<Deck>> AddSharedFromLinkDeck(int deckId)
        {
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var deck = _context.Decks.First(d => d.Id == deckId);
            var currentUser = await _context.Users.FirstOrDefaultAsync(o => o.Id == currentUserId);
            if (currentUser != null && !currentUser.Decks.Contains(deck))
            {
                currentUser.Decks.Add(deck);
            }
            return Ok();
        }
    }
}
