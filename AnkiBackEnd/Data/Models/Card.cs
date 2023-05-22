using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiDiplom.Data.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string FrontSide { get; set; }
        public string BackSide { get; set; }
        public string Topic { get; set; }
        [ForeignKey("user")]
        public string userId { get; set; }
        public virtual User user { get; set; }
    }
}
