/* eslint-disable no-use-before-define */
const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve({ id }, args) {
        return Book.find({ authorId: id });
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve({ authorId }, args) {
        return Author.findById(authorId);
      }
    }
  })
});

const AuthorQueries = {
  author: {
    type: AuthorType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
      return Author.findById(id);
    }
  },
  authors: {
    type: new GraphQLList(AuthorType),
    resolve(paren, args) {
      return Author.find({});
    }
  }
};

const BookQueries = {
  book: {
    type: BookType,
    args: { id: { type: GraphQLID } },
    resolve(parent, { id }) {
      return Book.findById(id);
    }
  },
  books: {
    type: new GraphQLList(BookType),
    resolve(parent, args) {
      return Book.find({});
    }
  }
};

const AuthorMutations = {
  addAuthor: {
    type: AuthorType,
    args: {
      name: { type: GraphQLString },
      age: { type: GraphQLInt }
    },
    resolve(parent, { name, age }) {
      const author = new Author({
        name,
        age
      });
      return author.save();
    }
  },
  deleteAuthor: {
    type: AuthorType,
    args: { id: { type: GraphQLString } },
    resolve(parent, { id }) {
      return Author.deleteOne({ _id: id });
    }
  }
};

const BookMutations = {
  addBook: {
    type: BookType,
    args: {
      title: { type: GraphQLString },
      genre: { type: GraphQLString },
      authorId: { type: GraphQLID }
    },
    resolve(parent, { title, genre, authorId }) {
      const book = new Book({
        title,
        genre,
        authorId
      });

      return book.save();
    }
  }
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...AuthorQueries,
    ...BookQueries
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...AuthorMutations,
    ...BookMutations
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
