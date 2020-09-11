<template>
  <div id="productList">
    <a @click.prevent="clearBasket" href="#">Очистить корзину</a>
    <ProductItem
        v-for="(item, index) of products"
        @buy-item="addItemToBasket($event)"
        :isInBasket="productsIdInBasket.some( elem => elem === item.id )"
        :productsIdInBasket="productsIdInBasket"
        :index="index"
        :item="item"
        :key="index"
    />
    <a class="load-more d-none" @click.prevent="getProducts" href="#">Loading ...</a>
  </div>
</template>

<script>
import ProductItem from "@/components/ProductItem"

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  data: function () {
    return {
      products: [],
      productsIdInBasket: []
    }
  },
  methods: {
    getProducts: function () {
      this.$el.querySelector('.load-more').classList.remove('d-none'); // show loader
      this.axios
          .get('https://jsonplaceholder.typicode.com/photos') // get data from api
          .then(response => {
            let loadedProducts = response.data.filter( (item, index) => {
              return index >= this.products.length && index < this.products.length + 50 // get only next 50 items
            } );
            this.products = [...this.products, ...loadedProducts]; // add items to current array
            this.$el.querySelector('.load-more').classList.add('d-none'); // hide loader
          });
    },
    addItemToBasket: function (productId) {
      this.productsIdInBasket.push(productId);
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    },
    clearBasket: function () {
      this.productsIdInBasket = [];
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    }
  },
  mounted() {
    this.getProducts();
    if(localStorage.getItem('productsIdInBasket') === '' || localStorage.getItem('productsIdInBasket') === 'undefined' || !localStorage.getItem('productsIdInBasket') || localStorage.getItem('productsIdInBasket') === '[object Object]') {
      localStorage.removeItem("productsIdInBasket");
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    } else {
      this.productsIdInBasket = JSON.parse(localStorage.getItem('productsIdInBasket')).productsIdInBasket;
    }
  },
  destroyed() {
    localStorage.setItem('productsIdInBasket', this.productsIdInBasket);
  }
}
</script>