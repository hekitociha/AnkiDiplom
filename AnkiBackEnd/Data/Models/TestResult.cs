using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiBackEnd.Data.Models
{
    public class TestResult
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public int TotalScore { get; set; }
        public int Score { get; set; }
        public double PercentOfRightAnswer { get; set; }

        public TestResult()
        {
            TotalScore = 0;
            Score = 0;
            PercentOfRightAnswer = 0;
        }
    }
}
