// Regex for Mongomongo operators
const mongoOpsRegex = /\b(gt|gte|lg|lte|in)\b/g;

exports.parseQuery = (query) => {
  let mongoQuery = {};

  const mongoQueryKeyword = ['select', 'sort', 'limit', 'page'];

  // Extract mongoose keyword from query
  mongoQueryKeyword.forEach(keyword => {
    if (query[keyword]) {
      mongoQuery[keyword] = query[keyword];
      delete query[keyword];
    }
  });

  // Create query string
  let queryString = JSON.stringify(query);

  // Create operators ($gte, $lte, etc..)
  queryString = queryString.replace(
    mongoOpsRegex, 
    match => `$${match}`
  );

  // Parse query back to JSON and send back 
  // as filter for mongoose
  const mongoFilter = JSON.parse(queryString);

  const parsedQuery = {
    mongoFilter,
    mongoQuery
  }

  return parsedQuery;
}