<template>
    <div id="app">

        <transition name="fade">
            <authorized v-if="token"></authorized>
            <not-authorized v-else></not-authorized>
        </transition>

    </div>
</template>

<script>
    import Authorized from "./components/Authorized";
    import NotAuthorized from "./components/NotAuthorized";
    import {mapGetters} from "vuex";

    export default {
        name: "app",
        components: {
            Authorized, NotAuthorized
        },
        computed: {
            ...mapGetters('authModule', ['token'])
        },
        created() {
            if (!this.token) {
                this.$router.push('/');
            }
        },
        updated() {
            if (!this.token) {
                this.$router.push('/');
            }
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
        width: calc(100% - #{$sidebar-collapsed-width});
        height: $sticky-footer-height;
        background-color: $gray-200;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;

        &.toggled {
            width: 100%;
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
