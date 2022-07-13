using Microsoft.AspNetCore.Http;
using ReStore.API.Helpers;
using System.Text.Json;

namespace ReStore.API.Extensions
{
    public static class HeaderExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metadata)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metadata, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
