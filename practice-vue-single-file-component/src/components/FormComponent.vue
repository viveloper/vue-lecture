<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" v-model="inputValue" v-on:keyup="onKeyup" placeholder="검색어를 입력하세요" autofocus>
    <button type="reset" class="btn-reset" v-show="inputValue.length>0" v-on:click.prevent="onReset"></button>
  </form>
</template>

<script>
export default {  
  props: ['value'],
  data() {
    return {
      inputValue: this.value,
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.inputValue = newVal;
    }
  },
  methods: {
    onSubmit(e) {
      this.$emit('@submit', this.inputValue.trim());
    },
    onKeyup(e) {
      if (this.inputValue.length === 0) {
        this.onReset();
      }
    },
    onReset(e) {      
      this.$emit('@reset');
    },
  }
}
</script>