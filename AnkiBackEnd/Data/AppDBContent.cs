using AnkiBackEnd.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AnkiDiplom.Data
{
    public class AppDBContent : IdentityDbContext<User>
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<Card> Cards { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public override DbSet<User> Users { get; set; }
    }
}
