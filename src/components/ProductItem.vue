<template>
  <div class="productItem">
    {{ index+1 }}, {{ item }}
    <a v-if="!isInBasket" @click="buy" class="productItem-btn productItem-buy" href="#">купить</a>
    <a v-if="!isInBasket" class="productItem-btn productItem-loading d-none" href="#">loading...</a>
    <a v-if="isInBasket" class="productItem-btn productItem-in-basket" href="#">в корзине</a>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    index: Number,
    item: Object,
    productsIdInBasket: Array,
    isInBasket: Boolean
  },
  methods: {
    buy: function () {
      this.$el.querySelector('.productItem-buy').classList.add('d-none');
      this.$el.querySelector('.productItem-loading').classList.remove('d-none');
      this.axios
          .get('https://jsonplaceholder.typicode.com/posts/1') // load data (according test-task)
          .then(response => {
            this.$el.querySelector('.productItem-buy').classList.remove('d-none');
            this.$el.querySelector('.productItem-loading').classList.add('d-none');
            console.log(response);
            this.$emit('buy-item', this.item.id);
          });
    }
  }
}
</script>