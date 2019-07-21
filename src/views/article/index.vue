<template>
  <div class="article-wrap">
    <van-nav-bar
      title="今日头条"
      left-text="返回"
      left-arrow
      @click-left="$route.back()"
    />
    <h2 class="article-title">{{ article.title }}</h2>
    <AuthInfo class="arto-info" :article="article" />
    <div class="article-content" v-html="article.content"></div>
    <MoreAction :article="article"/>
    <!-- <RecommendArticle /> -->
    <!-- <RecommendSearch /> -->
    <CommentList :article-id="$route.params.articleId" />
    <ReplyList />
    <WriteComment />
  </div>
</template>

<script>
import AuthInfo from './components/auth-info'
import CommentList from './components/comment-list'
import MoreAction from './components/more-action'
// import RecommendArticle from './components/recommend-article'
// import RecommendSearch from './components/recommend-search'
import ReplyList from './components/reply-list'
import WriteComment from './components/write-comment'
import { getArticleDetail } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {
    AuthInfo,
    MoreAction,
    // RecommendArticle,
    // RecommendSearch,
    CommentList,
    ReplyList,
    WriteComment
  },
  data () {
    return {
      article: {
        art_id: 1111,
        attitude: null,
        aut_id: 2,
        aut_name: '唯爱忠星',
        aut_photo: 'http://img3.imgtn.bdimg.com/it/u=2508268909,4102507524&fm=26&gp=0.jpg',
        ch_id: 8,
        content: `<p>旺旺~ ~ ~</p>`,
        is_collected: false,
        is_followed: false,
        pubdate: '2019-07-18T18:14:52',
        recomments: [],
        title: 'I LOVE YOU ❤'
      }
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
        this.article = data
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
    .arto-info {
      position: sticky;
      top: 0;
      background-color: #fff;
    }
  }
</style>
