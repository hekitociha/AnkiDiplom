namespace AnkiBackEnd.Data.DTOs
{
    public class TestResultDTO
    {
        public int TotalScore { get; set; }

        public int Score { get; set; }

        public double PercentOfRightAnswer { get; set; }

        public TestResultDTO()
        {
            TotalScore = 0;
            Score = 0;
            PercentOfRightAnswer = 0;
        }
    }
}
