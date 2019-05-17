<template>
    <div>
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
    import Header from "./Header";
    import Sidebar from "./Sidebar";
    import {mapGetters} from "vuex";

    export default {
        name: "Authorized",
        components: {
            Header, Sidebar
        },
        computed: {
            ...mapGetters(['toggled'])
        }
    }
</script>

<style scoped>

</style>