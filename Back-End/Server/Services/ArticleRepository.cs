using Library.Data;
using Library.Entities;
using Library.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
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

        public int CountArticlesPerCategory(string categoryName)
        {
            int count = _serverContext.Articles.Where(x => x.CategoryName.Equals(categoryName)).Count();

            return count;
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
            var categoryId = _serverContext.Categories.Where(x => x.Name.Equals(existingArticle.CategoryName)).Select(x => x.Id).ToString();
            existingArticle.CategoryId = categoryId;
            existingArticle.Description = model.Description;
            existingArticle.Date = DateTime.Now;

            _serverContext.SaveChanges();
        }

        public ICollection<Article> getAllArticles()
        {
            ICollection<Article> allArticles = new List<Article>();
            allArticles = _serverContext.Articles.OrderByDescending(x => x.Date).ToList();

            return allArticles;
        }

        public Article getArticle(string articleId)
        {
            Article article = _serverContext.Articles.FirstOrDefault(x => x.Id.Equals(articleId));

            return article;
        }

        public ArticlePagingList GetArticlePagingList(int currentPage = 1, int pageSize = 5)
        {
            var model = new ArticlePagingList();

            var articlesList = (from a in _serverContext.Articles
                                select new Article
                                {
                                    Id = a.Id,
                                    Title = a.Title,
                                    Introduction = a.Introduction,
                                    Description = a.Description,
                                    CategoryName = a.CategoryName,
                                    CategoryId = a.CategoryId,
                                    Date = a.Date
                                }).OrderByDescending(a => a.Date).Skip((currentPage - 1) * pageSize).Take(pageSize).ToList();

            model.ArticlesList = articlesList;

            int totalRecord = _serverContext.Articles.Count();

            var page = new Pagination
            {
                Count = totalRecord,
                CurrentPage = currentPage,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(decimal.Divide(totalRecord, pageSize)),
                IndexOne = ((currentPage - 1) * pageSize + 1),
                IndexTwo = (((currentPage - 1) * pageSize + pageSize) <= totalRecord ? ((currentPage - 1) * pageSize + pageSize) : totalRecord)
            };

            model.Pagination = page;

            return model;
        }

        public int GetTotalPages()
        {
            int totalRecord = _serverContext.Articles.Count();
            int totalPages = (int)Math.Ceiling(decimal.Divide(totalRecord, 5));

            return totalPages;
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
