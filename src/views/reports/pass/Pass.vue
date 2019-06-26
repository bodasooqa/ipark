<template>
    <div class="card mb-3">
        <div class="card-header"><i class="fas fa-table mr-2"></i>Отчет по проходам</div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 mt-3">
                    <div class="form-group">
                        <multiselect :options="nameCards()" v-model="input.cardtypes" :multiple="true"  :close-on-select="false"
                                     hideSelected :allow-empty="true" placeholder="Тип карты"></multiselect>
                    </div>
                </div>
                <div class="col-6 mt-3">
                    <div class="form-group">
                        <multiselect  :options="nameGroups()" :multiple="true" v-model="input.groups" :close-on-select="false"
                                      hideSelected :allow-empty="true" placeholder="Группа"></multiselect>
                    </div>
                </div>
                <div class="col-12 mt-3"><span>Период</span></div>
                <div class="col-6 mt-3">
                    <div class="form-group">
                        <label style="font-size: 14px">С</label>
                        <datetime v-model="input.startdt" input-class="form-control" format="dd.MM.yyyy HH:mm" type="datetime" :max-datetime="new Date().toISOString()"></datetime>
                    </div>
                </div>
                <div class="col-6 mt-3">

                    <div class="form-group">
                        <label style="font-size: 14px">По</label>
                        <datetime v-model="input.enddt" input-class="form-control" format="dd.MM.yyyy HH:mm" type="datetime" :min-datetime="input.startdt"></datetime>
                    </div>
                </div>
                <div class="col-12 my-3">
                    <button class="btn btn-success" @click="sendData()" :disabled="!input.startdt && !input.enddt">Выполнить</button>
                    <download-excel class="d-inline-block" :data="reports">
                        <button :disabled="!reports" class="btn btn-primary ml-2">Экспорт</button>
                    </download-excel>
                </div>
            </div>

            <table class="table table-bordered table-hover table-striped col-12" id="dataTable" width="100%" cellspacing="0">
                <thead>
                <tr>
                    <th v-for="thead in theads" :key="thead.param">
                        <div class="align-items-center d-flex justify-content-between">
                            {{thead.name}}
                            <i v-if="thead.type" @click="sortData(thead.param, thead.type)" class="fas fa-sort"></i>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="report in reports" :key="report.length">
                    <td>{{report.parkName}}</td>
                    <td>{{report.attrName}}</td>
                    <td>{{report.cardguid}}</td>
                    <td>{{report.regdt}}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>



</template>

<script>
    import Multiselect from 'vue-multiselect';
    import { Datetime } from 'vue-datetime';
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import moment from "moment";


    export default {
        data() {
            return {
                input: {
                    cardtypes: '',
                    groups: '',
                    startdt: null,
                    enddt: null,
                },
                theads: [
                    { name: 'Парк', type: 'compareString', param: 'parkName' },
                    { name: 'Аттракцион', type: 'compareString', param: 'attrName' },
                    { name: 'Идентификатор карты', type: 'compareString', param: 'cardguid' },
                    { name: 'Дата', type: 'compareString', param: 'regdt' },
                ],
            }
        },
        name: "Cashbox",
        components: { Multiselect, Datetime },
        computed: {
            ...mapGetters('reportModule', ['reports']),
            ...mapGetters('cardsModule', ['cards']),
            ...mapGetters('groupsModule', ['groups']),
        },
        methods: {
            ...mapActions('reportModule', ['setReport']),
            ...mapMutations('reportModule', {clearData: 'setReport'}),
            sendData() {
                if (this.input.cardtypes) this.input.cardtypes = this.input.cardtypes.join(', ');
                if (this.input.groups) this.input.groups = this.input.groups.join(', ');
                this.input.startdt = moment(this.input.startdt).format('YYYY-MM-DD hh:mm:ss');
                this.input.enddt = moment(this.input.enddt).format('YYYY-MM-DD hh:mm:ss');

                this.setReport(this.input);
                this.input.cardtypes = '';
                this.input.groups = '';
            },
            nameCards() {
                return this.cards.map(item => {
                    return item.cardTypeName;
                });
            },
            nameGroups() {
                return this.groups.map(item => {
                    return item.groupName;
                });
            },
            sortData(prop, type) {
                if (this.sortParam === prop) {
                    this.reports.reverse();
                } else {
                    this.sortParam = prop;
                    this.reports.sort(this[type]);
                }
            }
        },
        mounted() {
            this.nameCards();
            this.nameGroups();
            this.clearData([]);
        }
    }

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
    .fa-sort {
        cursor: pointer;
    }
</style>
