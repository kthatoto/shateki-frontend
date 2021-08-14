import axios from 'axios'

const apiClient = (method, url, data = null) => {
  return axios({
    method,
    url: process.env.SERVER_URL + url,
    data,
    headers: { Authorization: localStorage.jwt ? `Bearer ${localStorage.jwt}` : null }
  }).catch((err) => { return err.response })
}
export default ({ app }, inject) => { inject('apiClient', apiClient) }
