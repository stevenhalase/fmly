<template>
  <div class="feed-item">
    <div class="feed-item-side">
      <Avatar :imgSrc="item.user.avatar" size="small" class="feed-item-avatar" />
      <div class="feed-item-actions">
        <Fab @click.native="toggleComments(true)" class="feed-item-action" icon="regular/comment" />
        <Fab @click.native="likePost" class="feed-item-action" :icon="postLikedByUser ? 'heart' : 'regular/heart'" :disabled="postLikedByUser" />
      </div>
    </div>
    <div class="feed-item-content">
      <div class="feed-item-content-container">
        <div class="feed-item-content-container-title">
          <h3>{{ item.title }}</h3>
          <Badge>
            <timeago :datetime="item.date"></timeago>
          </Badge>
        </div>
        <p>{{ item.message }}</p>
      </div>
      <ResponsiveImage v-if="item.image" :imgSrc="item.image" width="100%" height="300px" innerShadow />
    </div>
    <Modal @close-modal="toggleComments(false)" :open="showComments">
      <CommentEntry :postId="item['.key']" />
      <FeedItemComments :postId="item['.key']" :comments="item.comments" />
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CommentEntry from '@/components/CommentEntry.vue';
import FeedItemComments from '@/components/FeedItemComments.vue';
import Avatar from '@/components/ui/Avatar.vue';
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue';
import Badge from '@/components/ui/Badge.vue';
import Fab from '@/components/ui/Fab.vue';
import Modal from '@/components/ui/Modal.vue';

export default {
  name: 'feed-item',
  data() {
    return {
      showComments: false,
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    postLikedByUser: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
  },
  methods: {
    likePost() {
      const payload = {
        postId: this.item.id,
        like: {
          date: new Date().getTime(),
          user: this.userData
        }
      };

      this.$store.dispatch('likePost', payload);
    },
    toggleComments(open) {
      this.showComments = open;
    },
  },
  components: {
    CommentEntry,
    FeedItemComments,
    Avatar,
    ResponsiveImage,
    Badge,
    Fab,
    Modal,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.feed-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;

  .feed-item-side {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .feed-item-avatar {
      margin-bottom: 10px;
    }

    .feed-item-actions {

      .feed-item-action {
        margin-bottom: 10px;
      }
    }
  }

  .feed-item-content {
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: $chromeWhite;
    border-radius: 4px;
    overflow: hidden;

    .feed-item-content-container {
      width: 100%;
      padding: 15px;

      .feed-item-content-container-title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }
}
</style>
