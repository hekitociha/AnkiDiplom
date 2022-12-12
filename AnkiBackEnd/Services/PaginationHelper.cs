using AnkiBackEnd.Interfaces;
using AnkiBackEnd.Wrappers;
using AnkiDiplom.Data.Models;

namespace AnkiBackEnd.Services
{
    public class PaginationHelper
    {
        public static PagedResponse<IEnumerable<Card>> CreatePagedReponse<thing>(List<Card> pagedData, PaginationFilter filter, int totalRecords, IUriService uriService, string route)
        {
            var respose = new PagedResponse<IEnumerable<Card>>(pagedData, filter.PageNumber, filter.PageSize);
            var totalPages = ((double)totalRecords / (double)filter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            respose.NextPage =
                filter.PageNumber >= 1 && filter.PageNumber < roundedTotalPages
                ? uriService.GetPageUri(new PaginationFilter(filter.PageNumber + 1, filter.PageSize), route)
                : null;
            respose.PreviousPage =
                filter.PageNumber - 1 >= 1 && filter.PageNumber <= roundedTotalPages
                ? uriService.GetPageUri(new PaginationFilter(filter.PageNumber - 1, filter.PageSize), route)
                : null;
            respose.FirstPage = uriService.GetPageUri(new PaginationFilter(1, filter.PageSize), route);
            respose.LastPage = uriService.GetPageUri(new PaginationFilter(roundedTotalPages, filter.PageSize), route);
            respose.TotalPages = roundedTotalPages;
            respose.TotalRecords = totalRecords;
            return respose;
        }
    }
}
