// Regex for MongoDB operators
const mongoOpsRegex = /\b(gt|gte|lg|lte|in)\b/g;

exports.parseQuery = (query) => {
  let dbQuery = {};

  const dbQueryKeyword = ['select', 'sort', 'limit', 'page'];

  // Extract 'select' & 'sort' keyword from query
  dbQueryKeyword.forEach(keyword => {
    if (query[keyword]) {
      dbQuery[keyword] = query[keyword];
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
  // as filter for database
  const dbFilter = JSON.parse(queryString);

  const parsedQuery = {
    dbFilter,
    dbQuery
  }
  
  return parsedQuery;
}