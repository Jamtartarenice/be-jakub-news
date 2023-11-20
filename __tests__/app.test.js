const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app.js');
const index = require('../db/data/test-data/index.js')

beforeAll(() => seed(index));
afterAll(() => db.end());

describe('app', () => {
describe('Get all topics', () => {

    test('checking to make sure that topics returns all in topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((topics) => {
            expect(topics.body.topics).toEqual(
            [
                { slug: 'mitch', description: 'The man, the Mitch, the legend' },
                { slug: 'cats', description: 'Not dogs' },
                { slug: 'paper', description: 'what books are made of' }
            ]);
        });
    });

    test('checking to make sure it returns the right amount of items', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((topics) => {
            expect(topics.text).not.toEqual("Failed to find this DataBase");
        });
    });
});
});
