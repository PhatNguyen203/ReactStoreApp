﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReStore.API.Entities
{
	public class BasketItem
	{
		public int Id { get; set; }
		public int Quantity { get; set; }

		//relationships
		public int ProductId { get; set; }
		public Product Product { get; set; }
		public int BasketId { get; set; }
		public Basket Basket { get; set; }
	}

}
