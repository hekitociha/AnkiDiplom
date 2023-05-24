using AnkiBackEnd.Data.Models;
using AnkiDiplom.Data;
using Microsoft.EntityFrameworkCore;

namespace AnkiBackEnd.Services
{
    public class FiltrationService
    {
        public static IQueryable<Card> FiltrationCards(AppDBContent context, string topic)
        {
            var cards = from c in context.Cards.Include(d => d.Deck)
                         select c;
            if (!String.IsNullOrEmpty(topic)) { cards = cards.Where(c => c.Topic == topic); }
            return cards;
        }

        public static IQueryable<Deck> FiltrationDecks(AppDBContent context, string topic)
        {
            var decks = from c in context.Decks.Include(d => d.User)
                        select c;
            if (!String.IsNullOrEmpty(topic)) { decks = decks.Where(c => c.Topic == topic); }
            return decks;
        }
    }
}
