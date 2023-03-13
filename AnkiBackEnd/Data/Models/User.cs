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

        private string _password { get; set; } 
        public string Password
        {
            get { return _password; }
            set { PasswordHelper.GetPasswordHash(value); }
        }
        List<Card> cards { get; set; }
    }
}
