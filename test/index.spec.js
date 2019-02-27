const expect = require('expect');
const faker = require('faker');
const {sayHello} = require('../src/index');

describe('Demo app', () => {
    it('should say hello world', () => {
        const result = sayHello();

        expect(result).toEqual('Hello World!');
    });

    it('should say hello to a user', () => {
        const name = faker.name.firstName(),
            result = sayHello(name);

        expect(result).toEqual(`Hello ${name}!`);
    });
});
