using Microsoft.EntityFrameworkCore;
using TaskManagerBackEnd.Data.Models;

namespace TaskManagerBackEnd.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<Card> Things { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
