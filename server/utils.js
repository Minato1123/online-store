/**
 * @typedef {(router: InstanceType<typeof import('koa-router')>, data, tokenMap: Map<string, number>) => void} RouteFn
 */

/**
 * @param {RouteFn} func
 * @returns {RouteFn}
 */
function defineRoute(func) {
  return func
}

function getTimeStamp() {
  return Date.now()
}

function getUserIdByToken(accessToken, tokenMap) {
  return tokenMap.get(accessToken)
}

module.exports = {
  defineRoute,
  getTimeStamp,
  getUserIdByToken,
}
