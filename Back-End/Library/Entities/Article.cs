using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Entities
{
    public class Article
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Introduction { get; set; }
        public string Description { get; set; }
        public string CategoryName { get; set; }
        public string CategoryId { get; set; }
        public DateTime Date { get; set; }

        public Category Category { get; set; }
    }
}
