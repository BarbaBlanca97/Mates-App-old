module.exports.queryTrimer= function(query) {
    const regexp = /(\s*)/;
    return query.replace(regexp, ' ');
}