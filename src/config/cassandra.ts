import { Client } from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.CASSANDRA_CONTACT_POINTS) {
  throw new Error('CASSANDRA_CONTACT_POINTS environment variable is not defined');
}

if (!process.env.CASSANDRA_KEYSPACE) {
  throw new Error('CASSANDRA_KEYSPACE environment variable is not defined');
}



export const cassandraClient = new Client({
    contactPoints: [process.env.CASSANDRA_CONTACT_POINTS!],
    localDataCenter: process.env.CASSANDRA_DATACENTER!,
    keyspace: process.env.CASSANDRA_KEYSPACE!,
  });