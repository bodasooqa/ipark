<template>
    <ul class="sidebar navbar-nav" :class="{toggled: toggled}">
        <li v-for="item in mainMenu" :key="item.alias" class="nav-item">
            <router-link class="nav-link" :to="`/${item.alias}`">
                <i class="fas fa-angle-right pr-2"></i>
                <span>{{item.name}}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    import $ from 'jquery';

    export default {
        name: "Sidebar",
        computed: {
            ...mapGetters(['sidebarMenu', 'toggled']),
            ...mapGetters('authModule', ['mainMenu'])
        },
        methods: {
            ...mapActions('authModule', ['setMenu'])
        },
        created() {
            this.setMenu();

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/variables";
    @import "../assets/scss/mixins";

    .navbar-nav {

        .form-inline .input-group {
            width: 100%;
        }

        .nav-item {
            .nav-link.router-link-active {
                color: $white;
                background-color: rgba(255, 255, 255, 0.04);
            }
            &.dropdown {
                .dropdown-toggle {
                    &::after {
                        width: 1rem;
                        text-align: center;
                        float: right;
                        vertical-align: 0;
                        border: 0;
                        font-weight: 900;
                        content: '\f105';
                        font-family: 'Font Awesome 5 Free';
                    }
                }
                &.show {
                    .dropdown-toggle::after {
                        content: '\f107';
                    }
                }
                &.no-arrow {
                    .dropdown-toggle::after {
                        display: none;
                    }
                }
            }
            .nav-link {
                &:focus {
                    // remove outline for Safari and Firefox
                    outline: none;
                }
                .badge {
                    position: absolute;
                    margin-left: 0.75rem;
                    top: 0.3rem;
                    font-weight: 400;
                    font-size: 0.5rem;
                }
            }
        }

        @media(min-width: 768px) {

            .form-inline .input-group {
                width: auto;
            }

        }

    }

    .sidebar {
        width: $sidebar-collapsed-width !important;
        background-color: $gray-900;
        min-height: calc(100vh - #{$navbar-base-height});
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        @include sidebar-icons;
        .nav-item {
            .nav-link {
                color: fade-out($white, 0.5);
                &:active,
                &:focus,
                &:hover {
                    color: fade-out($white, 0.25);
                }
                .fa-fw {
                    width: 2rem;
                }
            }
        }
        &.toggled {
            width: 0 !important;
            overflow: hidden;
        }
    }

    @media (min-width: 768px) {
        .sidebar {
            width: $sidebar-base-width !important;

            .nav-item {
                .nav-link {
                    display: block;
                    width: 100%;
                    text-align: left;
                    padding: 1rem;
                    width: $sidebar-base-width;
                    -webkit-transition: all 0.2s;
                    -moz-transition: all 0.2s;
                    -ms-transition: all 0.2s;
                    -o-transition: all 0.2s;
                    transition: all 0.2s;
                    span {
                        font-size: 1rem;
                        display: inline;
                    }
                }
                .dropdown-menu {
                    position: static !important;
                    margin: 0 1rem;
                    // Position fix for Firefox
                    top: 0;
                }
                &.dropdown .dropdown-toggle::after {
                    display: block;
                }
            }
            &.toggled {
                overflow: visible;
                width: $sidebar-collapsed-width !important;
                @include sidebar-icons;
            }
        }
    }

    // Fixed Nav Option
    // Add .fixed-top class to top .navbar-nav and to .sidebar - add .fixed-nav to body

    .sidebar.fixed-top {
        top: $navbar-base-height;
        height: calc(100vh - #{$navbar-base-height});
        overflow-y: auto;
    }
</style>