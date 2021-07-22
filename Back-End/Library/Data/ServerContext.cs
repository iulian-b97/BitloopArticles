using Library.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Data
{
    public class ServerContext : DbContext
    {
        public ServerContext(DbContextOptions<ServerContext> options) : base(options)
        {

        }

        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Principal Key
            modelBuilder.Entity<Category>()
                .HasKey(x => x.Id);

            //Principal Key
            modelBuilder.Entity<Article>()
                .HasKey(x => x.Id);

            //Category - Article (one to many)
            modelBuilder.Entity<Category>()
                .HasMany(x => x.Articles)
                .WithOne(y => y.Category);
        }
    }
}
