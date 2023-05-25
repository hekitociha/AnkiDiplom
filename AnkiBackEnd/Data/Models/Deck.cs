using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiBackEnd.Data.Models
{
    public class Deck
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public bool IsPrivate { get; set; }
        public bool IsSharedForAll { get; set; }
        public bool IsSharedFromLink { get; set; }
        public List<Card> Cards { get; set; } = new();
        public string Topic { get; set; }
    }
}
