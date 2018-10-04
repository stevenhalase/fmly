<template>
  <div class="feed-item" :class="!isMyPost ? 'my' : ''">
    <div class="feed-item-content">
      <div class="feed-item-content-container">
        <div class="feed-item-content-container-title">
          <p>{{ item.message }}</p>
          <Badge>
            <timeago :datetime="item.date"></timeago>
          </Badge>
        </div>
      </div>
      <ResponsiveImage v-if="item.image" :imgSrc="item.image" width="100%" height="300px" innerShadow />
    </div>
    <div class="feed-item-actions">
      <Fab @click.native="toggleComments(true)" class="feed-item-action" icon="regular/comment" />
      <Fab @click.native="addLike" class="feed-item-action" :icon="postLikedByUser ? 'heart' : 'regular/heart'" :disabled="postLikedByUser" />
      <Avatar :imgSrc="item.user.avatar" size="small" class="feed-item-avatar" />
    </div>
    <Modal @close-modal="toggleComments(false)" :open="showComments">
      <CommentEntry :postId="item._id" />
      <FeedItemComments :postId="item._id" :comments="item.comments" />
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
      userData: state => state.userData,
    }),
    isMyPost() {
      return this.item.user._id === this.userData._id;
    },
  },
  methods: {
    addLike() {
      const payload = {
        post: this.item._id,
        date: new Date().getTime(),
        user: this.userData,
      };

      this.$store.dispatch('addLike', payload);
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
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
  background-color: $chromeWhite;
  border-radius: 4px;
  overflow: hidden;
  padding: 10px;

  &.my {
    .feed-item-content {
      border-bottom: 3px solid $grey;
    }
  }

  .feed-item-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: $silver;
    border-radius: 4px;
    overflow: hidden;
    border-bottom: 3px solid $lightGrey;

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

  .feed-item-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    * {
      margin: 10px 5px 0;
    }
  }
}
</style>
