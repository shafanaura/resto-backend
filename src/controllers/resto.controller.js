const restoModel = require("../models/resto.model");
const { APP_URL } = process.env;
const status = require("../helpers/response.helper");
const qs = require("querystring");

exports.detailResto = async (req, res) => {
  const { name } = req.query;
  const results = await restoModel.getRestoByName(name);
  if (results.length > 0) {
    return status.ResponseStatus(res, 200, "Details of Resto", results);
  } else {
    return status.ResponseStatus(res, 400, "Resto not exists");
  }
};

exports.listResto = async (req, res) => {
  const cond = { ...req.query };
  cond.search = cond.search || "";
  cond.page = Number(cond.page) || 1;
  cond.limit = Number(cond.limit) || 10;
  cond.dataLimit = cond.limit * cond.page;
  cond.offset = (cond.page - 1) * cond.limit;
  cond.sort = cond.sort || "name";
  cond.order = cond.order || "ASC";

  const pageInfo = {
    nextLink: null,
    prevLink: null,
    totalData: 0,
    totalPage: 0,
    currentPage: 0,
  };

  const countData = await restoModel.getRestoCountByCondition(cond);
  pageInfo.totalData = countData[0].totalData;
  pageInfo.totalPage = Math.ceil(pageInfo.totalData / cond.limit);
  pageInfo.currentPage = cond.page;
  const nextQuery = qs.stringify({
    ...req.query,
    page: cond.page + 1,
  });
  const prevQuery = qs.stringify({
    ...req.query,
    page: cond.page - 1,
  });
  pageInfo.nextLink =
    cond.page < pageInfo.totalPage
      ? APP_URL.concat(`resto?${nextQuery}`)
      : null;
  pageInfo.prevLink =
    cond.page > 1 ? APP_URL.concat(`resto?${prevQuery}`) : null;

  const results = await restoModel.getRestoByCondition(cond);
  if (results) {
    return status.ResponseStatus(
      res,
      200,
      "List of all resto",
      results,
      pageInfo
    );
  }
};
