using Library.Data;
using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public class CategoryRepository : ICategoryRepository
    {
        public readonly ServerContext _serverContext;

        public CategoryRepository(ServerContext serverContext)
        {
            _serverContext = serverContext;
        }


        public void Add(Category model)
        {
            Category category = new Category
            {
                Name = model.Name
            };

            category.Id = Guid.NewGuid().ToString();
            category.Date = DateTime.Now;

            _serverContext.Categories.Add(category);
            _serverContext.SaveChanges();
        }

        public void Delete(string categoryId)
        {
            var category = _serverContext.Categories.Find(categoryId);

            _serverContext.Categories.Remove(category);
            _serverContext.SaveChanges();
        }

        public void Edit(string categoryId, Category category)
        {
            var existingCategory = _serverContext.Categories.Where(c => c.Id.Equals(categoryId)).FirstOrDefault<Category>();

            existingCategory.Name = category.Name;
            existingCategory.Date = DateTime.Now;

            _serverContext.SaveChanges();
        }

        public ICollection<Category> getAllCategories()
        {
            ICollection<Category> allCategories = new List<Category>();

            allCategories = _serverContext.Categories.OrderByDescending(x => x.Date).ToList();

            return allCategories;
        }

        public string GetIdByName(string categoryName)
        {
            var category = _serverContext.Categories.FirstOrDefault(x => x.Name.Equals(categoryName));

            return category.Id;
        }
    }
}
