<template>
  <form v-on:submit.prevent="onSubmit" v-on:reset.prevent="onReset">
    <input type="text" placeholder="검색어를 입력하세요" autofocus v-model="value" v-on:keyup="onKeyup">
    <button type="reset" class="btn-reset" v-show="value.length"></button>
  </form>
</template>

<script>
export default {
  props: ['query'],
  data() {
    return {
      value: ''
    }
  },
  watch: {
    query(newQuery, oldQuery){
      this.value = newQuery;
    }
  },
  methods: {
    onSubmit() {      
      this.$emit('@submit', this.value);
    },
    onKeyup() {
      if(!this.value.length) {
        this.onReset();
      }      
    },
    onReset() {
      this.$emit('@reset');
    }
  }
}
</script>

<style>

</style>