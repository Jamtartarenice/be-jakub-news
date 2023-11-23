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

describe('Get all comments by id', () => {
    test('should return all comments that have article id 1 in them ', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then((articleComments) => {
            const comments = articleComments.body.comments[1];
            comments.forEach(comment => {
                expect(comment).toEqual(expect.objectContaining({ 
                    comment_id: expect.any(Number), 
                    body: expect.any(String),
                    article_id: expect.any(Number),
                    author: expect.any(String),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                }));
            });
        });
    });

    test('should return fail and return 404', () => {
        return request(app)
        .get('/api/articles/1000/comments')
        .expect(404)
        .then((articleComments) => {
                expect(articleComments.res.statusMessage).toEqual('Not Found');
            });
        });
    });

    test('should return fail and return 400 when given an invaild id', () => {
        return request(app)
        .get('/api/articles/bean/comments')
        .expect(400)
        .then((articleComments) => {
                expect(articleComments.res.statusMessage).toEqual('Not Found');
            });
        });
    });

