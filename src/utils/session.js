const KEY = 'login-token'

export default {
  getToken () {
    //   返回JSON字符串类型
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },

  setToken (value) {
    //   设置的session必须是JSON字符串类型
    const jsonStr = JSON.stringify(value)
    window.sessionStorage.setItem(KEY, jsonStr)
  },

  delToken () {
    window.sessionStorage.removeItem(KEY)
  }
}
