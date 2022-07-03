using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReStore.API.Data;
using ReStore.API.DTOs;
using ReStore.API.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext context;

        public BasketController(StoreContext context)
        {
            this.context = context;
        }
        
        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>>Get()
        {
            var basket = await RetrieveBasket();
            if(basket == null) return NotFound();

           return Ok(MapBasketToBasketDto(basket));
        }

        [HttpPost] //api/basket?productId=1&quantity=1
        public async Task<ActionResult>Post(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();

            var product = await context.Products.FindAsync(productId);
            if(product == null) return NotFound();
            basket.AddItem(product, quantity);

            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", MapBasketToBasketDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket"});

        }

        [HttpDelete]
        public async Task<ActionResult>Delete(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            var resutl = await context.SaveChangesAsync() > 0;

            if (resutl) return CreatedAtRoute("GetBasket", MapBasketToBasketDto(basket));
            return BadRequest(new ProblemDetails { Title = "Problem removing item from basket" });
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            //set cookies
            var cookiesOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30), HttpOnly=true };
            Response.Cookies.Append("BuyerId", buyerId, cookiesOptions);

            var basket = new Basket { BuyerId = buyerId };
            context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket>RetrieveBasket()
        {
            return await context.Baskets
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["BuyerId"]);
        }

        private BasketDto MapBasketToBasketDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(i => new BasketItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.Product.Name,
                    Price = i.Product.Price,
                    PictureUrl = i.Product.PictureUrl,
                    Type = i.Product.Type,
                    Brand = i.Product.Brand,
                    Quantity = i.Quantity
                }).ToList()
            };
        }
    }
}
