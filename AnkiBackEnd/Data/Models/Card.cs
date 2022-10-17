using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerBackEnd.Data.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FrontSide { get; set; }
        public string BackSide { get; set; }
        [ForeignKey("user")]
        public int userid { get; set; }
        public virtual User user { get; set; }
    }
}
