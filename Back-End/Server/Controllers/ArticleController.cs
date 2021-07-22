using Library.Data;
using Library.Entities;
using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ServerContext _serverContext;
        private readonly IArticleRepository _articleRepository;

        public ArticleController(ServerContext serverContext ,IArticleRepository articleRepository)
        {
            _serverContext = serverContext;
            _articleRepository = articleRepository;
        }


        [HttpPost]
        [Route("AddArticle")]
        public async Task<ActionResult> AddArticle(Article model)
        {
            _articleRepository.Add(model);

            ICollection<Article> allArticles = new List<Article>();
            allArticles = _articleRepository.getAllArticles();

            return Ok(allArticles);
        }

        [HttpPut]
        [Route("EditArticle")]
        public async Task<ActionResult> EditArticle(string articleId ,Article model)
        {
            _articleRepository.Edit(articleId ,model);

            return Ok(model);
        }

        [HttpDelete]
        [Route("DeleteArticle")]
        public async Task<ActionResult> DeleteArticle(string articleId)
        {
            _articleRepository.Delete(articleId);

            return Ok("Success!");
        }

        [HttpGet]
        [Route("GetArticle")]
        public async Task<ActionResult> GetArticle(string articleId)
        {
            Article article = _articleRepository.getArticle(articleId);

            return Ok(article);
        }

        [HttpGet]
        [Route("GetAllArticles")]
        public async Task<ActionResult> GetAllArticles()
        {
            ICollection<Article> allArticles = new List<Article>();
            allArticles = _articleRepository.getAllArticles();

            return Ok(allArticles);
        }

        [HttpGet]
        [Route("GetArticlePaginationList")]
        public ActionResult<ArticlePagingList> GetArticlePaginationList(int currentPage = 1, int pageSize = 5)
        {
            var result = _articleRepository.GetArticlePagingList(currentPage, pageSize);

            if(result == null)
            {
                return NotFound(result);
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("GetTotalPages")]
        public ActionResult<ArticlePagingList> GetTotalPages()
        {
            var result = _articleRepository.GetTotalPages();

            return Ok(result);
        }

        [HttpGet]
        [Route("SearchArticle")]
        public async Task<ActionResult> SearchArticle(string title, string introduction, string description)
        {
            var result = _articleRepository.searchArticle(title, introduction, description);

            return Ok(result);
        }

        [HttpGet]
        [Route("CountArticlesByCategory")]
        public async Task<ActionResult> CountArticlesByCategory(string categoryName)
        {
            int count = _articleRepository.CountArticlesPerCategory(categoryName);

            return Ok(count);
        }
    }
}
