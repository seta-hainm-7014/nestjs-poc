export default () => ({
  port: process.env.PORT || 3030,
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID || 'microservice-a',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
    groupId: process.env.KAFKA_GROUP_ID || 'microservice-a-group',
  },
  services: {
    serviceB: {
      url: process.env.SERVICE_B_URL || 'http://localhost:3031',
    },
  },
});
