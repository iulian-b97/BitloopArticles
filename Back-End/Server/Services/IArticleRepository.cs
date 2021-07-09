using Library.Entities;
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
    }
}
