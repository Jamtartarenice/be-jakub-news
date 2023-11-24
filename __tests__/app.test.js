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

    test('should return fail and return 404 when passed a valid but non-existent article_id', () => {
        return request(app)
        .get('/api/articles/1000/comments')
        .expect(404)
        .then((articleComments) => {
                expect(articleComments.res.statusMessage).toEqual('Not Found');
            });
        });

    test('should return fail and return 400 when given an invaild id', () => {
        return request(app)
        .get('/api/articles/bean/comments')
        .expect(400)
        .then((articleComments) => {
                expect(articleComments.res.statusMessage).toEqual('Bad Request');
            });
        });
    });

    test('should return 200 even if its a valid id but no comments are there', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(200)
        .then((articleComments) => {
                expect(articleComments.res.statusMessage).toEqual('OK');
            });
        });
});

describe('Post article comment', () => {
    test('should post the article and be successful', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send( {
            body: "Wordsssssssssssss",
            username: "butter_bridge",
        })
        .expect(200)
        .then(({body: { comment }}) => {
            expect(comment).toEqual(expect.objectContaining({
                comment_id: 19,
                body: 'Wordsssssssssssss',
                article_id: 1,
                author: 'butter_bridge',
                votes: 0,
                created_at: expect.any(String)
            }))
        });
    });

    test('should fail with 400 when given an empty object ', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({})
        .expect(400)
        .then((responce) => {
            expect(responce.res.statusMessage).toEqual('Bad Request');
        });
    });

    test('should fail with 400 when given the wrong items in the object ', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({ rating_out_of_five: 6})
        .expect(400)
        .then((responce) => {
            expect(responce.res.statusMessage).toEqual('Bad Request');
        });
    });

    test('should pass with 200 when given unceassery objects', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({
            body: "Wordsssssssssssss",
            username: "butter_bridge",
            bean: 2
        })
        .expect(200)
        .then(({body: { comment }}) => {
            expect(comment).toEqual(expect.objectContaining({
                comment_id: expect.any(Number),
                body: 'Wordsssssssssssss',
                article_id: 1,
                author: 'butter_bridge',
                votes: 0,
                created_at: expect.any(String)
            }))
        });
    });

    test('should fail with 400 when article id is not a number', () => {
        return request(app)
        .post('/api/articles/beans/comments')
        .send({
            body: "Wordsssssssssssss",
            username: "butter_bridge",
        })
        .expect(400)
        .then((responce) => {
            expect(responce.res.statusMessage).toEqual('Bad Request');
        });
    });

    test('should fail with 404 when article id is invalid', () => {
        return request(app)
        .post('/api/articles/100/comments')
        .send({
            body: "Wordsssssssssssss",
            username: "butter_bridge",
        })
        .expect(404)
        .then((responce) => {
            expect(responce.res.statusMessage).toEqual('Not Found');
        });
    });

    test('should fail with 404 when username is not found', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .send({
            body: "Wordsssssssssssss",
            username: "random crap",
        })
        .expect(404)
        .then((responce) => {
            expect(responce.res.statusMessage).toEqual('Not Found');
        });
    });
});