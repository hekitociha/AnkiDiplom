using Microsoft.AspNetCore.Identity;

namespace AnkiBackEnd.Data.Models
{
    public class AuthUser : IdentityUser
    {
        public string Name { get; set; }
        public DateTime date { get; set; }
    }
}
