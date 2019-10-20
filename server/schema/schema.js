/* eslint-disable no-use-before-define */
const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
const books = [
  { title: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
  { title: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { title: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
  { title: "The Hero of Ages", genre: "Fantasy", id: "4", authorId: "2" },
  { title: "The Colour of Magic", genre: "Fantasy", id: "5", authorId: "3" },
  { title: "The Light Fantastic", genre: "Fantasy", id: "6", authorId: "3" }
];
const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve({ authorId }, args) {
        return _.find(authors, { id: authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve({ id }, args) {
        return _.filter(books, { authorId: id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(books, { id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return _.find(authors, { id });
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(paren, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
