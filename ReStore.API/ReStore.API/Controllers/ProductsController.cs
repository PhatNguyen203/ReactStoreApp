using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore.API.Data;
using ReStore.API.Entities;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<List<Product>>>Get()
        {
            return Ok(await context.Products.ToListAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>>Get(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(product == null)
                return NotFound("Product Not Found");

            return Ok(product);   
        }
    }
}
