using Microsoft.EntityFrameworkCore;
using AnkiDiplom.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AnkiDiplom.Data
{
    public class AppDBContent : IdentityDbContext<User>
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<Card> Cards { get; set; }
        public override DbSet<User> Users { get; set; }
    }
}
