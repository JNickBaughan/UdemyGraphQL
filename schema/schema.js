const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "25", firstName: "George", age: 29 }
];

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)  
        .then(res => res.data)
        .then(data => { console.log(data); return data; });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
