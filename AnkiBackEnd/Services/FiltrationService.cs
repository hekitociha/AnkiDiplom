using AnkiDiplom.Data;
using AnkiDiplom.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AnkiBackEnd.Services
{
    public class FiltrationService
    {
        public static IQueryable<Card> filtration(AppDBContent context, string topic)
        {
            var cards = from c in context.Cards.Include(c => c.user)
                         select c;
            if (!String.IsNullOrEmpty(topic)) { cards = cards.Where(c => c.Topic == topic); }
            return cards;
        }
    }
}
