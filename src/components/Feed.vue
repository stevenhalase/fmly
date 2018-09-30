<template>
  <div class="feed">
    <FeedItem
      v-for="(item, index) in feed"
      :key="index"
      :item="item"
      :postLikedByUser="postLikedByUser(item)" />
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
      feed: state => state.feed.sort((a, b) => {
        return b.date - a.date;
      }),
    }),
  },
  methods: {
    postLikedByUser(post) {
      return post.likes.find(like => like.user.id === this.userData.id) !== undefined;
    },
  },
  components: {
    FeedItem,
  }
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
