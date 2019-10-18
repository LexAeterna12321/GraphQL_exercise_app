const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

// dummy data
const books = [
  { title: "Name of the Wind", genre: "Fantasy", id: "1" },
  { title: "The Final Empire", genre: "Fantasy", id: "2" },
  { title: "The Long Earth", genre: "Sci-Fi", id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, { id }) {
        return _.find(books, { id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        //   code to get data from db / other source
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
