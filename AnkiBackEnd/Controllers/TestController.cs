using AnkiBackEnd.Data.DTOs;
using AnkiBackEnd.Services;
using AnkiDiplom.Data;
using AnkiDiplom.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AnkiBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        public TestResultDTO TestResult { get; set; }

        public TestController(AppDBContent context)
        {
            TestResult = new();
        }

        [Route("starttest")]
        public async Task<ActionResult<List<Card>>> StartTest(User user)
        {
            TestResult.TotalScore = user.Сards.Count;
            return user.Сards.ToList().Random(user.Сards.Count);
        }

        [Route("checkanswer")]
        public async Task<ActionResult<bool>> CheckAnswer(Card card, string userAnswer)
        {
            if (string.IsNullOrEmpty(userAnswer))
            {
                return false;
            }
            if (userAnswer != card.BackSide)
            {
                return false;
            }
            TestResult.Score += 1;
            return true;
        }

        [Route("getscores")]
        public TestResultDTO GetScores()
        {
            TestResult.PercentOfRightAnswer = TestResult.Score / TestResult.TotalScore * 100;
            return TestResult;
        }
    }
}
