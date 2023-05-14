using AnkiBackEnd.Services;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnkiDiplom.Data.Models
{
    public class User : IdentityUser
    {
        public List<Card> Сards { get; set; }
    }
}
