import axios from 'axios'

export const apiLogout = () => {
  sessionStorage.clear()
  delete axios.defaults.headers.common['Authorization']
  window.location.href = '/login'
}
