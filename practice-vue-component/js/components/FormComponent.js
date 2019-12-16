export default {
  template: '#search-form',
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
      // this.inputValue = '';
      this.$emit('@reset');
    },
  }
}