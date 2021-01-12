const YAML = require('yaml')

const render = (request) => {
    const {
        params,
        body,
        query
    } = request
    return YAML.stringify({params, body, query})
}

module.exports = {
    render,
}
