using System.Text;

namespace AnkiBackEnd.Services
{
    public class PasswordHelper
    {
        public static string GetPasswordHash(string password)
        {
            var hashPassword = Convert.ToBase64String(Encoding.UTF8.GetBytes(password));
            return hashPassword;
        }
    }
}
