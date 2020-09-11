<template>
  <div id="app" @scroll="handleScroll">
    <Header />
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ProductList />
    <Footer />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ProductList from './components/ProductList.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Header,
    Footer,
    ProductList
  },
  methods: {
    handleScroll: function () { //load more if srolled to bottom
      let container = this.$el;
      if ( container.scrollTop + window.innerHeight === container.scrollHeight ) {
        // this.$el.querySelector('#productList a.load-more').click();
      }
    }
  }
}
</script>

<style lang="scss">
.d-none {
  display: none!important;
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
