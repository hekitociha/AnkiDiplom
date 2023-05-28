using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace AnkiBackEnd.Data.Models
{
    public class User : IdentityUser
    {
        [NotMapped]
        public IFormFile? Avatar { get; set; }
        public string AvatarSrc { get; set; } = "";
        public List<Deck> Decks { get; set; } = new();
        public List<TestResult> TestResults { get; set; } = new();
        public string GetSrcPhoto()
        {
            string path = "wwwroot/photo/avatars";

            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            string fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";
            string fileNameWithPath = Path.Combine(path, fileName);
            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                Avatar.CopyTo(stream);
            }
            path = "photo/avatars";
            fileNameWithPath = Path.Combine(path, fileName);
            return fileNameWithPath;
        }
    }
}
