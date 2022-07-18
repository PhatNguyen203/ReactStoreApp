using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore.API.Data;
using ReStore.API.Entities;
using ReStore.API.Extensions;
using ReStore.API.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext context;

        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PageList<Product>>>Get([FromQuery]ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.SortBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            //Pagination
            var products = await PageList<Product>.ToPagedList(query, productParams.PageNumber, productParams.Size);

            //Custom Response Header
            HeaderExtensions.AddPaginationHeader(Response, products.MetaData);
            return products;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>>Get(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)
                return NotFound("Product Not Found");

            return Ok(product);   
        }
        [HttpGet("filters")]
        public async Task<IActionResult> Get() 
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
