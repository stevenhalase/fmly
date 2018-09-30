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
      <div class="feed-item-comment-entry">
        <Avatar :imgSrc="userData.avatar" size="small" class="feed-item-comment-entry-avatar" />
        <input v-model="comment.comment.message" class="feed-item-comment-entry-input" placeholder="Enter a comment..." />
        <Button @click.native="submitComment" class="feed-item-comment-entry-submit" text="POST" :block="true" size="small" />
      </div>
      <div class="feed-item-comments">
        <div v-for="(comment, index) in item.comments" :key="index" class="feed-item-comment">
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
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Avatar from '@/components/ui/Avatar.vue';
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue';
import Badge from '@/components/ui/Badge.vue';
import Fab from '@/components/ui/Fab.vue';
import Modal from '@/components/ui/Modal.vue';
import Button from '@/components/ui/Button.vue';

export default {
  name: 'feed-item',
  data() {
    return {
      showComments: false,
      comment: { 
        comment: {
          likes: []
        } 
      }
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
    likeComment(comment) {
      const payload = {
        postId: this.item.id,
        commentId: comment.id,
        like: {
          date: new Date().getTime(),
          user: this.userData
        }
      };

      this.$store.dispatch('likeComment', payload);
    },
    toggleComments(open) {
      this.showComments = open;
    },
    commentLikedByUser(comment) {
      return comment.likes.find(like => like.user.id === this.userData.id) !== undefined;
    },
    validComment() {
      return this.comment.comment.message && this.comment.comment.message.length > 0;
    },
    submitComment(ev) {
      if (this.validComment()) {
        this.comment.comment.date = new Date().getTime();

        const newComment = JSON.parse(JSON.stringify(this.comment));

        this.$store.dispatch('addComment', newComment)
          .then(response => {
            this.resetComment();
          });
      }
    },
    resetComment() {
      this.comment.date = null;
      this.comment.message = '';
    }
  },
  mounted() {
    this.comment.postId = this.item.id;
    this.comment.comment.user = this.userData;
  },
  components: {
    Avatar,
    ResponsiveImage,
    Badge,
    Fab,
    Modal,
    Button,
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

  .feed-item-comment-entry {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);

    .feed-item-comment-entry-input {
      width: calc(100% - 70px);
      border-radius: 4px;
      border: 1px solid rgba(0,0,0,0.1);
      margin-bottom: 5px;
      padding: 10px;
      margin-left: 10px;
    }

    .feed-item-comment-entry-submit {
      width: 100%;
      margin-top: 10px;
    }
  }

  .feed-item-comments {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
