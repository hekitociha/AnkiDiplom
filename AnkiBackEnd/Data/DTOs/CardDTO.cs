namespace AnkiBackEnd.Data.DTOs
{
    public class CardDTO
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public string Topic { get; set; }
        public bool IsFavorite { get; set; }
    }
}
