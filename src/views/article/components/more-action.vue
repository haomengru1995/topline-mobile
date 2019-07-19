<template>
  <div class="more-action">
    <van-button
    icon="star-o"
    round
    :loading="isLikeLoading"
    :type="isLike ? 'danger' : 'default'"
    @click="handleLike"
    >{{ isLike ? '取消' : ''}}点赞</van-button>
    <van-button
    icon="delete"
    round
    :loading="isDisLikeLoading"
    :type="isDisLike ? 'danger' : 'default'"
    @click="handleDisLike"
    >{{ isDisLike ? '取消' : ''}}不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle, disLikeArticle, unDisLikeArticle } from '@/api/article'
export default {
  name: 'MoreAction',
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isLikeLoading: false,
      isDisLikeLoading: false
    }
  },
  computed: {
    isLike () {
      return this.article.attitude === 1
    },
    isDisLike () {
      return this.article.attitude === 0
    }
  },
  created () {},
  methods: {
    async handleLike () {
      try {
        if (!this.$checkLogin()) {
          return
        }
        this.isLikeLoading = true
        const articleId = this.article.art_id
        // 如果已赞，则取消点赞
        if (this.article.attitude === 1) {
          await unLikeArticle(articleId)
          this.article.attitude = -1
        } else {
          // 如果没赞，则赞
          await likeArticle(articleId)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isLikeLoading = false
    },
    async handleDisLike () {
      try {
        if (!this.$checkLogin()) {
          return
        }
        this.isDisLikeLoading = true
        const articleId = this.article.art_id
        if (this.article.attitude === 0) {
          await disLikeArticle(articleId)
          this.article.attitude = -1
        } else {
          await unDisLikeArticle(articleId)
          this.article.attitude = 0
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.isDisLikeLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
