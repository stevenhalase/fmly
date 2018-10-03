import Vue from 'vue';
import Vuex from 'vuex';

const axios = require('axios');

Vue.use(Vuex);

const apiBase = process.env.API_BASE;
const routes = {
  USER: {
    LOGIN: 'users/login',
  },
  POST: {
    GET: 'posts/',
    POST: 'posts/',
  },
  LIKE: {
    POST: 'likes/',
  },
  COMMENT: {
    POST: 'comments/',
  },
};

export default new Vuex.Store({
  state: {
    users: [],
    comments: [],
    posts: [],
    userData: {},
  },
  mutations: {
    setUser(state, user) {
      state.userData = user;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    register({ commit, state }, user) {
      return new Promise((resolve, reject) => {
        state.dbRefs.usersRef.push(user);
        resolve();
      });
    },
    login({ commit, state }, payload) {
      return axios.post(`${apiBase}${routes.USER.LOGIN}`, payload)
        .then((response) => {
          const user = response.data;
          commit('setUser', user);
          localStorage.setItem('fmlyu', JSON.stringify(user));
        })
        .catch(error => console.log(error));
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('setUser', {});
        localStorage.removeItem('fmlyu');
        resolve();
      });
    },
    getLocalUser({ commit, state }, username) {
      return new Promise((resolve, reject) => {
        const userJson = localStorage.getItem('fmlyu');
        if (userJson) {
          const user = JSON.parse(userJson);
          commit('setUser', user);
          resolve();
        } else {
          reject();
        }
      });
    },
    getPosts({ commit, state }) {
      return axios.get(`${apiBase}${routes.POST.GET}`)
        .then((response) => {
          const posts = response.data;
          commit('setPosts', posts);
        })
        .catch(error => console.log(error));
    },
    addPost({ commit, state, dispatch }, payload) {
      return axios.post(`${apiBase}${routes.POST.POST}`, payload)
        .then((response) => {
          console.log(response);
          dispatch('getPosts');
        })
        .catch(error => console.log(error));
    },
    addLike({ commit, state, dispatch }, payload) {
      return axios.post(`${apiBase}${routes.LIKE.POST}`, payload)
        .then((response) => {
          console.log(response);
          dispatch('getPosts');
        })
        .catch(error => console.log(error));
    },
    addComment({ commit, state, dispatch }, payload) {
      return axios.post(`${apiBase}${routes.COMMENT.POST}`, payload)
        .then((response) => {
          console.log(response);
          dispatch('getPosts');
        })
        .catch(error => console.log(error));
    },
  },
});
