<template>
  <div class="feed">
    <FeedItem
      v-for="(post, index) in sortedPosts"
      :key="index"
      :item="post"
      :postLikedByUser="postLikedByUser(post)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FeedItem from './FeedItem.vue';

export default {
  name: 'feed',
  computed: {
    ...mapState({
      userData: state => state.userData,
      posts: state => state.posts,
    }),
    sortedPosts() {
      return this.posts.sort((a, b) => b.date - a.date);
    },
  },
  methods: {
    postLikedByUser(post) {
      return post.likes ? post.likes.find(like => like.user === this.userData._id) !== undefined : false;
    },
  },
  beforeMount() {
    this.$store.dispatch('getPosts');
  },
  components: {
    FeedItem,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.feed {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
</style>
