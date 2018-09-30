import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {
      id: 2394837,
      name: 'Jim Smith',
      avatar: 'http://placeimg.com/640/480/people',
    },
    feed: [
      {
        id: 2394865,
        date: 1538334058761,
        title: 'Had a really good time today!',
        message: 'We went for a bike ride today.',
        image: 'http://placeimg.com/640/479/nature',
        user: {
          id: 2394838,
          name: 'Joe Smith',
          avatar: 'http://placeimg.com/640/478/people',
        },
        likes: [
          {
            date: 1538334058761,
            user: {
              id: 2394837,
              name: 'Jim Smith',
              avatar: 'http://placeimg.com/640/480/people',
            }
          }
        ],
        comments: [
          {
            id: 2394830,
            date: 1538334058761,
            message: 'This is a really cool post!',
            user: {
              id: 2394837,
              name: 'Jim Smith',
              avatar: 'http://placeimg.com/640/480/people',
            },
            likes: [
              {
                date: 1538334058761,
                user: {
                  id: 2394837,
                  name: 'Jim Smith',
                  avatar: 'http://placeimg.com/640/480/people',
                }
              }
            ]
          },
          {
            id: 2394829,
            date: 1538334058761,
            message: 'I agree this is pretty cool!',
            user: {
              id: 2394838,
              name: 'Joe Smith',
              avatar: 'http://placeimg.com/640/474/people',
            },
            likes: []
          }
        ]
      },
      {
        id: 2394889,
        date: 1538334058761,
        title: 'Had a really good time today!',
        message: 'We went for a bike ride today.',
        image: 'http://placeimg.com/640/477/nature',
        user: {
          id: 2394838,
          name: 'Joe Smith',
          avatar: 'http://placeimg.com/640/476/people',
        },
        likes: [],
        comments: []
      },
      {
        id: 2394812,
        date: 1538334058761,
        title: 'Had a really good time today!',
        message: 'We went for a bike ride today.',
        image: 'http://placeimg.com/640/475/nature',
        user: {
          id: 2394838,
          name: 'Joe Smith',
          avatar: 'http://placeimg.com/640/474/people',
        },
        likes: [],
        comments: []
      },
    ]
  },
  mutations: {
    addPost(state, post) {
      state.feed.push(post);
    },
    addPostLike(state, payload) {
      const post = state.feed.find(post => post.id === payload.postId);
      if (post) {
        post.likes.push(payload.like);
      }
    },
    addComment(state, payload) {
      const post = state.feed.find(post => post.id === payload.postId);
      if (post) {
        post.comments.push(payload.comment);
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
    addPost({commit, state}, post) {
      return new Promise((resolve, reject) => {
        commit('addPost', post);
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
        commit('addComment', comment);
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
