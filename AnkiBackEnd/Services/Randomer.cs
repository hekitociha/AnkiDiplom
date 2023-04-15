namespace AnkiBackEnd.Services
{
    public static class Randomer
    {
        public static List<T> Random<T>(this IEnumerable<T> enumerable, int elementsCount = 1)
        {
            if (enumerable == null)
            {
                throw new ArgumentNullException(nameof(enumerable));
            }

            var list = enumerable as IList<T> ?? enumerable.ToList();
            if (list.Count == 0 || list.Count < elementsCount)
            {
                throw new ArgumentOutOfRangeException(nameof(enumerable));
            }
            return list.OrderBy(arg => Guid.NewGuid()).Take(elementsCount).ToList();
        }

    }
}
