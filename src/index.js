exports.sayHello = (event, context, callback) => {
    console.log(':::: Called sayHello lambda');

    let {name} = event;

    if (!name) {
        name = 'World';
    }

    console.log(':::: Name =', name);

    callback(null, `Hello ${name}!`);
};
