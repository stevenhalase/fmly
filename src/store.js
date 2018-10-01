import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { firebaseMutations, firebaseAction } from 'vuexfire';

var config = {
  apiKey: "AIzaSyAVRTxsNkDNq0En_0uAPmhUA_P_5hk6erA",
  authDomain: "fmly-fcfc0.firebaseapp.com",
  databaseURL: "https://fmly-fcfc0.firebaseio.com",
  projectId: "fmly-fcfc0",
  storageBucket: "fmly-fcfc0.appspot.com",
  messagingSenderId: "466327690780"
};
var db = firebase.initializeApp(config).database();
var usersRef = db.ref('users');
var postsRef = db.ref('posts');
var commentsRef = db.ref('comments');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: db,
    dbRefs: {
      usersRef,
      postsRef,
      commentsRef,
    },
    dataLoaded: {
      users: false,
      posts: false,
      comments: false,
    },
    users: [],
    comments: [],
    feed: [],
    populatedFeed: [],
    userData: {},
  },
  mutations: {
    ...firebaseMutations,
    setDataLoaded(state, payload) {
      state.dataLoaded[payload.key] = payload.value;
      if (Object.values(state.dataLoaded).every(entry => entry)) {
        let populatedFeed = [];
        let populatedComments = [];
        for (let comment of state.comments) {
          const commentCopy = JSON.parse(JSON.stringify(comment));
          if (commentCopy.user) {
            commentCopy.user = state.users.find(user => user['.key'] === commentCopy.user);
          }
          if (!commentCopy.likes) {
            commentCopy.likes = [];
          }
          populatedComments.push(commentCopy);
        }
        for (let post of state.feed) {
          const postCopy = JSON.parse(JSON.stringify(post));
          if (postCopy.user) {
            postCopy.user = state.users.find(user => user['.key'] === postCopy.user);
          }
          if (!postCopy.comments) {
            postCopy.comments = [];
          }
          if (!postCopy.likes) {
            postCopy.likes = [];
          }

          postCopy.comments = populatedComments.filter(comment => comment.post === post['.key']).sort((a, b) => b.date - a.date);

          populatedFeed.push(postCopy);
        }

        state.populatedFeed = populatedFeed.sort((a, b) => b.date - a.date);
      }
    },
    setUser(state, user) {
      state.userData = user;
    },
    addPostLike(state, payload) {
      const post = state.feed.find(post => post.id === payload.postId);
      if (post) {
        post.likes.push(payload.like);
      }
    },
    addCommentLike(state, payload) {
      const post = state.feed.find(post => post.id === payload.postId);
      if (post) {
        const comment = post.comments.find(comment => comment.id === payload.commentId);
        if (comment) {
          comment.likes.push(payload.like);
        }
      }
    }
  },
  actions: {
    setRefs: firebaseAction((context, refs) => {
      const { commit, state, bindFirebaseRef } = context;
      bindFirebaseRef('users', refs.usersRef, {
        readyCallback: () => {
          commit('setDataLoaded', { key : 'users', value: true });
        }
      });
      bindFirebaseRef('feed', refs.postsRef, {
        readyCallback: () => {
          commit('setDataLoaded', { key : 'posts', value: true });
        }
      });
      bindFirebaseRef('comments', refs.commentsRef, {
        readyCallback: () => {
          commit('setDataLoaded', { key : 'comments', value: true });
        }
      });
    }),
    register({commit, state}, user) {
      return new Promise((resolve, reject) => {
        state.dbRefs.usersRef.push(user);
        resolve();
      });
    },
    login({commit, state}, username) {
      return new Promise((resolve, reject) => {
        const user = state.users.find(user => user.username === username);
        if (user) {
          commit('setUser', user);

          localStorage.setItem('fmlyu', JSON.stringify(user));

          resolve();
        } else {
          reject('No user found.');
        }
      });
    },
    getLocalUser({commit, state}, username) {
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
    addPost({commit, state}, post) {
      return new Promise((resolve, reject) => {
        state.dbRefs.postsRef.push(post);
        resolve();
      });
    },
    likePost({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('addPostLike', payload);
        resolve();
      });
    },
    addComment({commit, state}, comment) {
      return new Promise((resolve, reject) => {
        state.dbRefs.commentsRef.push(comment);
        resolve();
      });
    },
    likeComment({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        commit('addCommentLike', payload);
        resolve();
      });
    }
  },
});
