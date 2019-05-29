const env = process.env.NODE_ENV
let baseUrl = ''
const v = 1
const domainUrl = `http://ssss:32011/v${v}`
const domainUrl_build = `http://sss:32011/v${v}`
if (env === 'development') {
  baseUrl = domainUrl
} else {
  baseUrl = domainUrl_build
}
export default {
  baseUrl
}
