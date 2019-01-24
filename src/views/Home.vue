<template>
  <div class="home row">
    <div v-for="item in sidebarMenu" :key="item.url" class="col-2">
      <router-link :to="item.url" class="card mb-3">
        <div class="card-body align-items-center card-body d-flex flex-column">
          <i class="fa-icon" :class="item.icon"></i>
          <span class="mt-3">{{item.name}}</span>
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
    ...mapGetters(['sidebarMenu'])
  }
}
</script>

<style lang="scss" scoped>
  .fa-icon {
    font-size: 3rem;
  }
  .card {
    span {
      text-align: center;
    }
  }
</style>