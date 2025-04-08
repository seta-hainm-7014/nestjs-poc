export default () => ({
  port: process.env.PORT || 3031,
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || 'microservice-b',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    groupId: process.env.KAFKA_GROUP_ID || 'microservice-b-group',
  },
});
