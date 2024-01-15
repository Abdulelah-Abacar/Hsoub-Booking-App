const { gql } = require("apollo-server-express");
const typeDefs = gql`
  # Queries
  type Query {
    events: [Event]
    bookings: [Booking] #authenticated user only
    getUserEvents(userId: ID!): [Event]
  }
  # Mutations
  type Mutation {
    createUser(userInput: UserInput!): AuthData
    createEvent(eventInput: EventInput!): Event
    bookEvent(eventId: ID!): Booking
    cancelBooking(bookingId: ID!): Event
    login(email: String!, password: String!): AuthData
    deleteEvent(eventId: ID!): [Event]
  }
  # Input Definitions
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  type AuthData {
    token: String!
    userId: ID!
    username: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  type Subscription {
    eventAdded: Event!
  }
`;

module.exports = { typeDefs };
