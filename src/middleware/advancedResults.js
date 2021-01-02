const { parseQuery } = require('../utils/helpers');

const advancedResults = (model, populate) => (async (req, res, next) => {
  const { mongoFilter, mongoQuery } = parseQuery(req.query);

  // TODO: Practice preventing NoSQL injection

  // Initiate query builder with filter
  let query = model.find(mongoFilter);

  if (mongoQuery.select) {
    const fields = mongoQuery.select.split(',').join(' ');
    query.select(fields);
  }
  if (mongoQuery.sort) {
    const sortBy = mongoQuery.sort.split(',').join(' ');
    query.sort(sortBy);
  }

  // Pagination
  const page = parseInt(mongoQuery.page, 10) || 1;
  const limit = parseInt(mongoQuery.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query.skip(startIndex).limit(limit);

  // Execute query
  if (populate) {
    query = query.populate(populate);
  }
  const results = await query;

  // Pagination result
  let pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();
});

module.exports = advancedResults;