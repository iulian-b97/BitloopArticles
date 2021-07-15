using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Models
{
    public class ArticlePagingList
    {
        public Pagination Pagination { get; set; }
        public List<Article> ArticlesList { get; set; }
    }
}
