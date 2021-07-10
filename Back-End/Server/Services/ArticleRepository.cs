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
            existingArticle.Date = DateTime.Now;

            _serverContext.SaveChanges();
        }
    }
}
