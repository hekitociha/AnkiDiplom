using AnkiBackEnd.Services;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnkiDiplom.Data.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }

        List<Card> cards { get; set; }
    }
}
