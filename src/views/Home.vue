<template>
    <div class="home row">
        <div class="col-md-12 col-lg-3 col-xl-2" v-for="item in mainMenu" :key="item.alias">
            <router-link :to="item.alias" class="card mb-3 text-center link-block">
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

    .link-block {
        transition: all 0.2s;
        &:hover {
            transform: perspective(650px) translateZ(10px);
            box-shadow: 0 4px 10px #cecece;
        }
    }
</style>