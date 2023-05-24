using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiBackEnd.Data.Models
{
    public class User : IdentityUser
    {
        [NotMapped]
        public IFormFile Avatar { get; set; }
        public string AvatarSrc { get; set; } = "";
        public List<Deck> Decks { get; set; } = new();
        public List<TestResult> TestResults { get; set; } = new();
    }
}
