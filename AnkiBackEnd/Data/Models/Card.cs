using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiBackEnd.Data.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string FrontSide { get; set; }
        public string BackSide { get; set; }
        public string Topic { get; set; }
        public int Favorite { get; set; }
        [ForeignKey("Deck")]
        public string DeckId { get; set; }
        public virtual Deck Deck { get; set; }
    }
}
