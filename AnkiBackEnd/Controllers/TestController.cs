using AnkiBackEnd.Data.Models;
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
    public class TestController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly AppDBContent _context;
        TestResult _result;

        public TestController(IHttpContextAccessor httpContextAccessor, AppDBContent context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _result = new();
        }

        [HttpGet("/profile/starttest")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<List<Card>>> StartTest(Deck deck)
        {
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUser = await _context.Users.Include(u => u.Decks)
                .FirstOrDefaultAsync(o => o.Id == currentUserId);
            _result.TotalScore = currentUser.Decks.FirstOrDefault(d => d.Id == deck.Id).Cards.Count;
            return currentUser.Decks.FirstOrDefault(d => d.Id == deck.Id).Cards.ToList().Random(currentUser.Decks.FirstOrDefault(d => d.Id == deck.Id).Cards.Count);
        }

        [HttpGet("/profile/checkanswer")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<bool>> CheckAnswer(Card card, string userAnswer)
        {
            if (string.IsNullOrEmpty(userAnswer))
            {
                return false;
            }
            if (userAnswer != card.Answer)
            {
                return false;
            }
            _result.Score += 1;
            return true;
        }

        [HttpGet("/profile/getscores")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<TestResult>> GetScores()
        {
            var currentUserId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var currentUser = await _context.Users.Include(u => u.Decks)
                .Include(u => u.TestResults)
                .FirstOrDefaultAsync(o => o.Id == currentUserId);
            _result.PercentOfRightAnswer = _result.Score / _result.TotalScore * 100;
            currentUser.TestResults.Add(_result);
            await _context.SaveChangesAsync();

            return _result;
        }
    }
}
