using AnkiBackEnd.Services;

namespace AnkiBackEnd.Interfaces
{
    public interface IUriService
    {
        public Uri GetPageUri(PaginationFilter filter, string route);
    }
}
