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
    public class CategoryController : ControllerBase
    {
        private readonly ServerContext _serverContext;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ServerContext serverContext, ICategoryRepository categoryRepository)
        {
            _serverContext = serverContext;
            _categoryRepository = categoryRepository;
        }


        [HttpPost]
        [Route("AddCategory")]
        public async Task<ActionResult> AddCategory(Category model)
        {
             _categoryRepository.Add(model);

            ICollection<Category> allCategories = new List<Category>();
            allCategories = _categoryRepository.getAllCategories();

            return Ok(allCategories);
        }

        [HttpPut]
        [Route("EditCategory")]
        public async Task<ActionResult> EditCategory(string categoryId, Category model)
        {
            _categoryRepository.Edit(categoryId, model);

            return Ok(model);
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public async Task<ActionResult> DeleteCategory(string categoryId)
        {
            _categoryRepository.Delete(categoryId);

            return Ok();
        }

        [HttpGet]
        [Route("GetCategory")]
        public async Task<ActionResult> GetCategory(string categoryId)
        {
            Category category = _categoryRepository.getCategory(categoryId);

            return Ok(category);
        }

        [HttpGet]
        [Route("GetAllCategories")]
        public async Task<ActionResult> GetAllCategories()
        {
            ICollection<Category> allCategories = new List<Category>();
            allCategories = _categoryRepository.getAllCategories();

            return Ok(allCategories);
        }
    }
}
