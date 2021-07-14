using Library.Data;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class ArticleRepository : IArticleRepository
    {
        public readonly ServerContext _serverContext;

        public ArticleRepository(ServerContext serverContext)
        {
            _serverContext = serverContext;
        }


        public void Add(Article model)
        {
            Article article = new Article
            {
                Title = model.Title,
                Introduction = model.Introduction,
                Description = model.Description,
                CategoryName = model.CategoryName
            };


            article.Id = Guid.NewGuid().ToString();
            var category = _serverContext.Categories.FirstOrDefault(x => x.Name.Equals(article.CategoryName));
            article.CategoryId = category.Id;
            article.Date = DateTime.Now;

            _serverContext.Articles.Add(article);
            _serverContext.SaveChanges();
        }

        public void Delete(string articleId)
        {
            var article = _serverContext.Articles.Find(articleId);

            _serverContext.Articles.Remove(article);
            _serverContext.SaveChanges();
        }

        public void Edit(string articleId, Article model)
        {
            var existingArticle = _serverContext.Articles.Where(c => c.Id.Equals(articleId)).FirstOrDefault<Article>();

            existingArticle.Title = model.Title;
            existingArticle.Introduction = model.Introduction;
            existingArticle.CategoryName = model.CategoryName;
            var category = _serverContext.Categories.FirstOrDefault(x => x.Name.Equals(existingArticle.CategoryName));
            existingArticle.CategoryId = category.Id;
            existingArticle.Date = DateTime.Now;

            _serverContext.SaveChanges();
        }

        public ICollection<Article> getAllArticles()
        {
            ICollection<Article> allArticles = new List<Article>();
            allArticles = _serverContext.Articles.OrderByDescending(x => x.Date).ToList();

            return allArticles;
        }

        public ICollection<Article> searchArticle(string title, string introduction, string description)
        {
            IQueryable<Article> searchArticles = _serverContext.Articles;

            if (!string.IsNullOrEmpty(title))
            {
                searchArticles = searchArticles.Where(x => x.Title.Contains(title));
            }

            if (!string.IsNullOrEmpty(introduction))
            {
                searchArticles = searchArticles.Where(x => x.Introduction.Contains(introduction));
            }

            if (!string.IsNullOrEmpty(description))
            {
                searchArticles = searchArticles.Where(x => x.Description.Contains(description));
            }

            return searchArticles.ToList();
        }
    }
}
