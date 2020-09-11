<template>
  <div id="app" @scroll="handleScroll">
    <Header />
    <img alt="Vue logo" src="./assets/logo.png">
    <ProductList />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    ProductList
  },
  methods: {
    handleScroll: function () { //load more if srolled to bottom
      let container = this.$el;
      if ( container.scrollTop + window.innerHeight === container.scrollHeight ) {
        this.$el.querySelector('#productList a.load-more').click();
      }
    }
  }
}
</script>

<style lang="scss">
$primary: #41b883;
$secondary: #35495e;
$black: #000;
$white: #fff;

.d-none {
  display: none!important;
}

.btn {
  padding: 15px 25px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-block;
  font-weight: 700;
  color: #fff;
  background-color: #41b883;
  &.btn-secondary {
    background-color: #35495e;
  }
}

.loader-ico {
  width: 40px;
  height: 40px;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: auto;
}
</style>
