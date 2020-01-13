import gql from "graphql-tag";

export default gql(`
  query getMovies($limit:Int, $nextToken:String) {
    getMovies(limit:$limit, nextToken:$nextToken) {
      __typename
      nextToken
      totalCount
      items {
        id
        source
        details {
          title
          year
          poster
          rated
          released
          runtime
          director
          plot
          language
          country
          votes
          price
        }
      }
    }
  }`);
