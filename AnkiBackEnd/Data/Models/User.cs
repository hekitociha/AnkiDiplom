using System.ComponentModel.DataAnnotations;
using System.Text;
using XSystem.Security.Cryptography;

namespace TaskManagerBackEnd.Data.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Login { get; set; }
        private string password;
        public string Password
        {
            set { password = value; }
            get { return password; }
        }
        List<Card> cards { get; set; }

        private string GetPasswordHash(string password)
        {
            byte[] bytes = Encoding.Unicode.GetBytes(password);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashPassword = string.Empty;
            foreach (byte x in hash)
            {
                hashPassword += String.Format("{0:x2}", x);
            }
            return hashPassword;
        }
    }
}
