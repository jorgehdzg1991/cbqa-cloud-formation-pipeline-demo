const expect = require('expect');
const sinon = require('sinon');
const faker = require('faker');
const {sayHello} = require('../src/index');

describe('Demo app', () => {
    it('should say hello world', () => {
        const callback = sinon.fake();

        sayHello({}, null, callback);

        expect(callback.calledOnce).toEqual(true);
        expect(callback.args[0][1]).toEqual({ greeting: 'Hello World!' });
    });

    it('should say hello to a user', () => {
        const callback = sinon.fake();
        const name = faker.name.firstName();

        sayHello({name}, null, callback);

        expect(callback.calledOnce).toEqual(true);
        expect(callback.args[0][1]).toEqual({ greeting: `Hello ${name}!` });
    });
});
