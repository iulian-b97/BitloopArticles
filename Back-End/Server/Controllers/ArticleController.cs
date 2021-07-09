using Library.Data;
using Library.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

            return Ok(model);
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
    }
}
