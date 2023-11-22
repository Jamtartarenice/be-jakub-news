const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app.js');
const index = require('../db/data/test-data/index.js')
const endPointsFile = require('../endpoints.json');

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
});

describe('/api (getting all endpoints)', () => {
    test('making sure that its responding with an object of endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((topics) => {
            expect(topics.body.endPoints).toEqual(endPointsFile);
        });
    });

    test('making sure that its responding with an object of endpoints that has all the required sub keys', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((topics) => {
            const {body: { endPoints }} = topics
            const tempKey = Object.keys(endPoints)[1];
            
            expect(Object.keys(endPoints[tempKey]))
            .toEqual([ "description", "queries", "exampleResponse" ]);
        });
    });
});

describe('Get all articles', () => {
    test('making sure to return all articles', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((articles) => {
            articles.body.articles.forEach(article => {
                expect(article).toEqual(expect.objectContaining({ 
                    article_id: expect.any(Number), 
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                }));
            });
            
        });
    });
});

});
