'use strict'

const YAML = require('yaml')

/** Renders a HTML presentation of a YAML CV
 * 
 * @param {string} yaml_src The YAML source to render
 * @returns {string} resulting HTML
 */

const render = yaml_src => {
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
