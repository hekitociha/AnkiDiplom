using AnkiBackEnd.Data.Models;

namespace AnkiBackEnd.Data.DTOs
{
    public class DeckDTO
    {
        public bool IsPrivate { get; set; }
        public bool IsSharedForAll { get; set; }
        public bool IsSharedFromLink { get; set; }
        public List<Card> Cards { get; set; } = new();
        public string Topic { get; set; }
    }
}
