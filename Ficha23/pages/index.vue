<template>
  <div class="app">
    <app-ficha-produto v-for= "(artigo, index) in artigos" :key="index" :produto="artigo.produto" :valor="artigo.valor" />
  </div>
</template>

<script>
import appFichaProduto from '@/components/produto/app-ficha-produto';
import axios from 'axios';
export default{
  components: {
    appFichaProduto
  },
  asyncData(){
    return axios.get('https://ficha22.firebaseio.com/.json')
      .then((res) => {
        return { artigos: res.data }
      })
  }
}
</script>

<style>
.app{
  margin-top: 4.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

<style scoped>
  .main-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #022d30;
    height: 4.5rem;
  }

  .main-nav{
    height: 100%;
  }

  .nav-links{
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .nav-link{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
    padding: 0.3rem;
  }

  .nav-link a{
    display: block;
    text-decoration: none;
    color: white;
  }

  .nav-link a:hover,
  .nav-link a:active,
  .nav-link.nuxt-link-exact-active a{
    color: #06c4d1;
  }

  .nav-link.nuxt-link-exact-active {
    border-bottom: 3px solid #06c4d1;
  }
</style>
