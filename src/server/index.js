import axios from 'axios'
import './http'
import domains from './domains'
/* eslint-disable */

export const getAuditSwitch = ($param = {}) => axios.post(domains.baseUrl + `/xxx`, $param)
