<template>
  <div class="article-wrap">
    <van-nav-bar
      title="今日头条"
      left-text="返回"
      left-arrow
      @click-left="$route.back()"
    />
    <h2 class="article-title">文章标题</h2>
    <AuthInfo />
    <div class="article-content">
      <img width="100%" src="http://img3.imgtn.bdimg.com/it/u=2508268909,4102507524&fm=26&gp=0.jpg" alt="">
      <p>我叫王小贱，旺旺~ ~</p>
    </div>
    <MoreAction />
    <RecommendArticle />
    <RecommendSearch />
    <CommentList />
    <ReplyList />
    <WriteComment />
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import CommentList from './components/comment-list'
import MoreAction from './components/more-action'
import RecommendArticle from './components/recommend-article'
import RecommendSearch from './components/recommend-search'
import ReplyList from './components/reply-list'
import WriteComment from './components/write-comment'
import { getArticleDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    RecommendArticle,
    RecommendSearch,
    CommentList,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.loadArticleDetail()
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    async loadArticleDetail () {
      try {
        const data = await getArticleDetail(this.$route.params.articleId.toString())
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .article-wrap {
    padding: 20px;
    .article-content {
      font-size: 24px;
    }
  }
</style>
