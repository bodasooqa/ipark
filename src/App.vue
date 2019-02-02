<template>
  <div id="app">

    <Header></Header>

    <div id="wrapper">

      <sidebar></sidebar>

      <div id="content-wrapper">
        <div class="container-fluid">

          <router-view/>

        </div>

        <footer class="sticky-footer" :class="{toggled: toggled}">
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
  import {mapGetters} from "vuex";

  import Header from "./components/Header";
  import Sidebar from "./components/Sidebar";

  export default {
    name: "app",
    components: {
      Header, Sidebar
    },
    computed: {
      ...mapGetters(['toggled'])
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=cyrillic');
  @import "assets/scss/sb-admin";

  html, body#page-top {
    font-family: 'Open Sans', sans-serif;
  }

  footer.sticky-footer {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(100% - #{$sidebar-base-width});
    height: $sticky-footer-height;
    background-color: $gray-200;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -ms-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
    &.toggled {
      width: calc(100% - #{$sidebar-collapsed-width});
    }
    .copyright {
      line-height: 1;
      font-size: 0.8rem;
    }
    @media (min-width: 768px) {
      width: calc(100% - #{$sidebar-base-width});
    }
  }

  body.sidebar-toggled {
    footer.sticky-footer {
      width: 100%;
    }
    @media (min-width: 768px) {
      footer.sticky-footer {
        width: calc(100% - #{$sidebar-collapsed-width});
      }
      &.toggled {

      }
    }
  }

</style>
