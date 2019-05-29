<template>
  <div class="home row">
    <div class="col-12">
      <router-link v-for="item in mainMenu" :key="item.alias" :to="item.alias" class="card mb-3">
        <div class="card-body">
<!--          <i class="fa-icon" :class="item.icon"></i>-->
          {{item.name}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Home',
  computed: {
    ...mapGetters('authModule', ['mainMenu'])
  }
}
</script>

<style lang="scss" scoped>
  .card {
    text-decoration: none;
    span {
      color: #555;
      text-align: center;
    }
    &:hover {
      span {
        color: #000;
      }
    }
    .card-body {
      i {
        width: 22px;
        text-align: center;
      }
    }
  }
</style>