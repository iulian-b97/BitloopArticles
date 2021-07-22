using Library.Entities;
using Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface IArticleRepository
    {
        void Add(Article model);
        void Edit(string articleId, Article model);
        void Delete(string articleId);
        Article getArticle(string articleId);
        ICollection<Article> getAllArticles();
        ICollection<Article> searchArticle(string title, string introduction, string description);
        public ArticlePagingList GetArticlePagingList(int currentPage = 1, int pageSize = 5);
        public int GetTotalPages();
    }
}
