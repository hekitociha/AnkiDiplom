using System.Security.Cryptography;
using System.Text;

namespace AnkiBackEnd.Services
{
    public class PasswordHelper
    {
        public static string GetPasswordHash(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var hash = BitConverter.ToString(hashBytes);
                var hashPassword = Convert.ToBase64String(Encoding.UTF8.GetBytes(hash));
                return hashPassword;
            }
        }
    }
}
