'use strict';

/*
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
var UrlParser = (function() {

    function protocol(url) {
        return url.split(":")[0];
    }

    function domain(url) {
        return url.split("/")[2];
    }

    function path(url) {
        const patth = url.split("/")[3];
        return patth.split("?")[0];
    }

    function querystring(url) {
        return url.split("?")[1];
    }

    return {
        protocol,
        domain,
        path,
        querystring
    }
})();

let createUrlBuilder = function(host) {

    let builder = function(obj) {
        let path = function(value) {
            return `/${value}`
        }
        let query = function(obj) {
            let keys = Object.keys(obj);
            return `?${keys[0]}=${obj[keys[0]]}&${keys[1]}=${obj[keys[1]]}`
        }

        builder.path = () => host + path(obj.path);
        builder.query = () => host + query(obj.query);

        return `${host}${path(obj.path)}${query(obj.query)}`
    }
    return builder;
};


if (typeof module !== "undefined") {
    module.exports = {
        UrlParser,
        createUrlBuilder
    }
};