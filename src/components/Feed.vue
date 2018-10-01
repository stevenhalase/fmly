<template>
  <div class="feed">
    <FeedItem
      v-for="(item, index) in populatedFeed"
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
      dataLoaded: state => state.dataLoaded,
      userData: state => state.userData,
      populatedFeed: state => state.populatedFeed,
    }),
  },
  methods: {
    postLikedByUser(post) {
      return post.likes ? post.likes.find(like => like.user.id === this.userData.id) !== undefined : false;
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
