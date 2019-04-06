<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Отчет по проходам</div>
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">Наличный</label>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="defaultCheck2">
                        <label class="form-check-label" for="defaultCheck2">Безналичный</label>
                    </div>
                </div>
                <div class="col-12 mt-3">
                    <div class="form-group">
                        <multiselect :options="[1,2,3]" placeholder="Тип карты"></multiselect>
                    </div>
                </div>
                <div class="col-6 mt-3">
                    <div class="form-group">
                        <label>С</label>
                        <datetime input-class="form-control" format="dd.MM.yyyy"></datetime>
                    </div>
                </div>
                <div class="col-6 mt-3">

                    <div class="form-group">
                        <label>По</label>
                        <datetime input-class="form-control" format="dd.MM.yyyy"></datetime>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect';
    import { Datetime } from 'vue-datetime';


    export default {
        name: "Cashbox",
        components: { Multiselect, Datetime }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>