<template>
  <div class="productItem">
    <img :src="item.thumbnailUrl" alt="" class="productItem-img">
    <h4>{{ item.title }}</h4>
    <a v-if="!isInBasket" @click="buy" class="btn productItem-btn productItem-buy" href="#">купить</a>
    <a v-if="!isInBasket" class="btn productItem-btn productItem-loading d-none" href="#"><img class="loader-ico" alt="loader" src="@/assets/loader.gif"></a>
    <a v-if="isInBasket" class="btn btn-primary productItem-btn productItem-in-basket" href="#">в корзине</a>
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
      this.$el.querySelector('.productItem-buy').classList.add('d-none'); // hide "buy" button
      this.$el.querySelector('.productItem-loading').classList.remove('d-none'); // show loader
      this.axios
          .get('https://jsonplaceholder.typicode.com/posts/1') // load data (according test-task)
          .then(response => {
            this.$el.querySelector('.productItem-buy').classList.remove('d-none'); // show "buy" button
            this.$el.querySelector('.productItem-loading').classList.add('d-none'); // hide loader
            console.log(response); // show response in console
            this.$emit('buy-item', this.item.id); // emit @buy-item event
          });
    }
  }
}
</script>

<style scoped lang="scss">
  .productItem {
    background-color: #fff;
    border: 2px solid #ddd;
    padding: 15px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>