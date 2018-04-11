const bodyParser = require('./body-parser');
const { parse } = require('url');
const defaultGreeting = require('../lib/basic-greeting');

//define GET method @ url(path) /greeting/<name>
//**say hello unless a greeting is defined a la /greeting/person?salutation=frogs */
//**if a name is not included in the above string, respond with "stranger" */
//define GET method @ url(path) /fact where an object with a random fact property is returned
//**make sure content-type is application/json, and all facts contain the word HTTP */

module.exports = (req, res) => {

    const { pathname, query } = parse(req.url, true);

    if(req.method === 'POST') {
        bodyParser(req)
            .then(body => {
                res.write('you posted: ');
                res.write(JSON.stringify(body, true, 2));
                res.end();
            });
    }
    else if(req.method === 'GET' && pathname.startsWith('/greeting')){
        console.log(query);
        res.end(defaultGreeting(query.salutation));
    }
    else {
        res.end(`you just ${req.method}, how boring`);
    }
};