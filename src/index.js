exports.sayHello = (name = 'World') => {
    const {ENV} = process.env;

    console.log(`Running "sayHello" lambda on the ${ENV} environment.`);

    return `Hello ${name}!`;
};
