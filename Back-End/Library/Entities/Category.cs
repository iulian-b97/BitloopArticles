using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Entities
{
    public class Category
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }

        public ICollection<Article> Articles { get; set; }
    }
}
