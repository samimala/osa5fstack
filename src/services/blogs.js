import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('Response data: ', response.data)
  return response.data
}

export default { getAll}