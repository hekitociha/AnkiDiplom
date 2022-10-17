using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagerBackEnd.Data.Models
{
    public class Problem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        [ForeignKey("user")]
        public int userid { get; set; }
        public virtual User user { get; set; }
    }
}
