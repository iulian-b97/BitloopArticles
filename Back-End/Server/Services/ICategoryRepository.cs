using Library.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services
{
    public interface ICategoryRepository
    {
        void Add(Category model);
        void Edit(string categoryId, Category model);
        void Delete(string categoryId);
        ICollection<Category> getAllCategories();
        string GetIdByName(string categoryName);
    }
}
