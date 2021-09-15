/* eslint-disable */
import { login, RefreshToken} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'


const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, _csrf } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, _csrf: _csrf }).then(async res => {
        console.log('res: ',res);
        const { data } = res;
        setToken('uuid', data.userId);
        setToken('username', data.username);
        setToken('accessToken', data.accessToken); //用户token
        setToken('refreshToken',data.refreshToken); //刷新token
        setToken('pattern', data.pattern);
        setToken('expiresIn', data.expiresIn);//刷新时限
        // const { data } = response
        commit('SET_TOKEN', data.accessToken)
        commit('SET_NAME', data.userName)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        setInterval(() => {
          // const myDate = new Date();
          // const currentDate = myDate.getMinutes() + '分'+ myDate.getSeconds() + '秒' + myDate.getMilliseconds() + '豪秒';
          // // 每次循环打印当前时间
          // console.log(currentDate);
          RefreshToken({refreshToken: getToken('refreshToken')}).then(respone=>{
            setToken('accessToken', respone.accessToken) //用户token
            setToken('refreshToken', respone.refreshToken) // 刷新token
            setToken('pattern', respone.pattern) //
            setToken('expiresIn', respone.expiresIn) //刷新时限
            console.log(respone)
          })
        }, (getToken('expiresIn') - 180) * 1000);
        resolve()
      }).catch(error => {
        console.log('err: ',error);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken('uuid');
      removeToken('username');
      removeToken('accessToken'); //用户token
      removeToken('refreshToken'); //刷新token
      removeToken('pattern');
      removeToken('expiresIn');
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },


  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken('uuid');
      removeToken('username');
      removeToken('accessToken'); //用户token
      removeToken('refreshToken'); //刷新token
      removeToken('pattern');
      removeToken('expiresIn');
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

