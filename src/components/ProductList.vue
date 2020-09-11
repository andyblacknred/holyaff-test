<template>
  <div id="productList">
    <div class="container">
      <a class="productList-btn btn btn-secondary" @click.prevent="clearBasket" href="#">Очистить корзину</a>
      <div class="productList-block">
        <ProductItem
            v-for="(item, index) of products"
            @buy-item="addItemToBasket($event)"
            :isInBasket="productsIdInBasket.some( elem => elem === item.id )"
            :productsIdInBasket="productsIdInBasket"
            :index="index"
            :item="item"
            :key="index"
        />
      </div>
      <a class="load-more d-non" @click.prevent="getProducts" href="#"><img class="loader-ico" alt="loader" src="@/assets/loader.gif"></a>
    </div>
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
    addItemToBasket: function (productId) { // add product-id to basket and add basket to localStorage
      this.productsIdInBasket.push(productId);
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    },
    clearBasket: function () { // clear basket-array from component and localStorage
      this.productsIdInBasket = [];
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    }
  },
  mounted() {
    this.getProducts(); // get first 50 products on load
    if(localStorage.getItem('productsIdInBasket') === '' || localStorage.getItem('productsIdInBasket') === 'undefined' || !localStorage.getItem('productsIdInBasket') || localStorage.getItem('productsIdInBasket') === '[object Object]') {  // get basket-array from localStorage on load
      localStorage.removeItem("productsIdInBasket");
      localStorage.setItem('productsIdInBasket', JSON.stringify({ productsIdInBasket: this.productsIdInBasket }));
    } else {
      this.productsIdInBasket = JSON.parse(localStorage.getItem('productsIdInBasket')).productsIdInBasket;
    }
  },
  destroyed() {
    localStorage.setItem('productsIdInBasket', this.productsIdInBasket);  // write basket-array to localStorage when component destroyed
  }
}
</script>

<style scoped lang="scss">
#productList {

  .productList-btn {
    margin-bottom: 15px;
  }

  .productList-block {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 768px)  {
      grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 500px)  {
      grid-template-columns: 1fr;
    }
  }

}
</style>