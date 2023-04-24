const db = require("../models/index");

module.exports = async function Paginate(
  Model,
  req,
  options = {},
  oldWay = false
) {
  const pg = req?.query?.page || req?.body?.page || 1;
  const pgSize = req?.query?.pageSize || req?.body?.pageSize || 10;

  const page = Number(pg);
  const pageSize = Number(pgSize);
  const sortBy = req?.query?.sortBy || req?.body?.sortBy || [];
  let sortByList = [];

  if (!!oldWay) {
    if (!Array.isArray(sortBy)) {
      sortByList.push([sortBy.split(":")]);
    } else {
      sortByList = sortBy?.map((item) => {
        return item.split(":");
      });
    }
  } else {
    if (!Array.isArray(sortBy) && sortBy) {
      const [field, value] = sortBy.split(":");
      sortByList = db.Sequelize.literal(`${field} ${value}`);
    } else if (sortBy?.length > 0) {
      const [field, value] = sortBy?.[0].split(":");
      sortByList = db.Sequelize.literal(`${field} ${value}`);
    }
  }

  let offset = (page - 1) * pageSize;

  const { count: counter, rows } = await Model.findAndCountAll({
    ...options,
    offset: offset,
    limit: pageSize,
    ...(sortByList?.length !== 0 && {
      order: sortByList,
    }),
  });

  const count = Array.isArray(counter) ? counter.length : counter;
  return {
    list: rows,
    page: page,
    pageSize: pageSize,
    noOfRecords: count,
    pages: Math.ceil(count / pageSize),
  };
};
