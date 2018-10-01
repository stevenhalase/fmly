<template>
  <div class="feed-item-comments">
    <div class="feed-item-comments-container">
      <div v-for="(comment, index) in sortedComments" :key="index" class="feed-item-comment">
        <div class="feed-item-comment-side">
          <Avatar :imgSrc="comment.user.avatar" size="small"/>
        </div>
        <div class="feed-item-comment-content">
          <p>{{ comment.message }}</p>
        </div>
        <div class="feed-item-comment-actions">
          <Fab
            @click.native="likeComment(comment)"
            class="feed-item-comment-action"
            :icon="commentLikedByUser(comment) ? 'heart' : 'regular/heart'"
            :disabled="commentLikedByUser(comment)"
            size="small" />
          <Badge class="feed-item-comment-actions-time" size="small">
            <timeago :datetime="comment.date"></timeago>
          </Badge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import Badge from '@/components/ui/Badge.vue';
import Fab from '@/components/ui/Fab.vue';

export default {
  name: 'feed-item-comments',
  props: {
    postId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState({
      userData: state => state.userData
    }),
    sortedComments() {
      return this.comments.sort((a, b) => b.date - a.date);
    },
  },
  methods: {
    likeComment(comment) {
      const payload = {
        postId: this.postId,
        commentId: comment.id,
        like: {
          date: new Date().getTime(),
          user: this.userData,
        }
      };

      this.$store.dispatch('likeComment', payload);
    },
    commentLikedByUser(comment) {
      return comment.likes.find(like => like.user.id === this.userData.id) !== undefined;
    },
  },
  components: {
    Avatar,
    Badge,
    Fab,
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global';

.feed-item-comments {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 15px;

  .feed-item-comments-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 10px 0;

    .feed-item-comment {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .feed-item-comment-side {
        width: 10%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .feed-item-comment-content {
        width: 85%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid rgba(0,0,0,0.1);
      }

      .feed-item-comment-actions {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px;

        .feed-item-comment-action {
          margin-right: 10px;
        }

        .feed-item-comment-actions-time {
          width: auto;
        }
      }
    }
  }
}
</style>
