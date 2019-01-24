<template>
  <div id="app">

    <Header></Header>

    <div id="wrapper">

      <sidebar></sidebar>

      <div id="content-wrapper">
        <div class="container-fluid">

          <router-view/>

        </div>

        <footer class="sticky-footer">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright © iPark 2019</span>
            </div>
          </div>
        </footer>

      </div>

    </div>

  </div>
</template>

<script>
  import Header from "./components/Header";
  import Sidebar from "./components/Sidebar";

  export default {
    name: "app",
    components: {
      Header, Sidebar
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=cyrillic');
  @import "assets/scss/sb-admin";

  html, body#page-top {
    font-family: 'Open Sans', sans-serif;
  }
</style>
