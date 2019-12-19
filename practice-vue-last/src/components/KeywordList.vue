<template>
  <ul class="list">
    <li v-for="(item, index) in keywordList" v-on:click="onClickList(item.keyword)">
      <span v-if="recommendType" class="number">{{index+1}}</span>
      {{item.keyword}}
      <span v-if="recentType" class="date">{{item.date}}</span>
      <button v-if="recentType" class="btn-remove" v-on:click.stop="onClickRemoveBtn(item.keyword)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['type', 'keywordList'],
  computed: {
    recommendType() {
      return this.type === 'recommend';
    },
    recentType() {
      return this.type === 'recent';
    }
  },
  methods: {
    onClickList(keyword) {
      this.$emit('@onClickList', keyword);
    },
    onClickRemoveBtn(keyword) {
      this.$emit('@onClickRemoveBtn', keyword);
    }
  }
}
</script>