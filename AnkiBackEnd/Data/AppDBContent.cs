using Microsoft.EntityFrameworkCore;
using AnkiDiplom.Data.Models;

namespace AnkiDiplom.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<Card> Cards { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
