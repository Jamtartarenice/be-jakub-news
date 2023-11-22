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

describe('/api/articles/:article_id', () => {
    test('making sure that its responding with an article with the desired id', () => {
        return request(app)
        .get('/api/articles/2')
        .expect(200)
        .then((article) => {
            expect(article.body.article.article_id).toBe(2);
            expect(article.body.article)
            .toEqual({
                article_id: 2,
                title: 'Sony Vaio; or, The Laptop',
                topic: 'mitch',
                author: 'icellusedkars',
                body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
                created_at: '2020-10-16T05:03:00.000Z',
                votes: 0,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
            });
        });
    });

    test('making sure it returns 404 when given an valid but non existing id', () => {
        return request(app)
        .get('/api/articles/50')
        .expect(404)
        .then((article) => {
            expect(article.res.statusMessage).toBe('Not Found');
        });
    });

    test('making sure it returns 400 when given an invalid id', () => {
        return request(app)
        .get('/api/articles/beans')
        .expect(400)
        .then((article) => {
            expect(article.body.msg).toBe('Invalid input');
        });
    });
});
});
