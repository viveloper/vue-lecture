<template>
  <form v-on:submit.prevent="onSubmit" v-on:reset="onReset">
    <input type="text" v-model="value" placeholder="검색어를 입력하세요" v-on:keyup="onKeyup" autofocus>
    <button v-show="value.length" type="reset" class="btn-reset"></button>
  </form>
</template>

<script>
export default {
  props: ['query'],
  data () {
    return {
      value: '',      
    }
  },
  watch: {
    query(newVal, oldVal) {
      this.value = this.query;
    }
  },
  methods: {
    onKeyup(e) {      
      this.$emit('@onKeyup', this.value);
      if(this.value.length === 0) this.onReset();
    },
    onReset(e) {      
      this.$emit('@onReset');
    },
    onSubmit(e) {      
      this.$emit('@onSubmit');
    }
  }
}
</script>