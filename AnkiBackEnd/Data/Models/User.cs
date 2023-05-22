using AnkiBackEnd.Services;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AnkiDiplom.Data.Models
{
    public class User : IdentityUser
    {
        [NotMapped]
        public IFormFile Avatar { get; set; }
        public string AvatarSrc { get; set; } = "";
        public List<Card> Cards { get; set; } = new();
    }
}
