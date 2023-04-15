using AnkiBackEnd.Services;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AnkiDiplom.Data.Models
{
    public class User : IdentityUser
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        private string _password { get; set; }
        public string Password
        {
            get { return _password; }
            set { PasswordHelper.GetPasswordHash(value); }
        }

        public List<Card> Сards { get; set; }
    }
}
