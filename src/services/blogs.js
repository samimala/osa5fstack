import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('Response data: ', response.data)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const update = async (updatedObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const updateUrl = baseUrl + '/' + updatedObject.id

  console.log('Inside blogs.update')
  const response = await axios.put(updateUrl, updatedObject, config)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  console.log('About to create', newObject)
  console.log('..with token', token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create, update }