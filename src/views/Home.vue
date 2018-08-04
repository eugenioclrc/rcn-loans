<template>
  <div>
    <h1 style="
    font-size: 24px;text-transform: uppercase;
    font-weight: 300;
    ">Requests</h1>
    <div style=" background-color: #3f51b5;color: #fff;    display: inline-flex;
    padding: 7px 12px;
    border-radius: 24px;
    align-items: center;
    cursor: default;">
      {{loans.length}} AVAILABLE
    </div>

    <div class="grid">
      <rcn-card-loan v-for="l in loans" :key="l.id" v-bind:loan="l">
      </rcn-card-loan>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { getOpenLoans } from '../contracts';

import rcnCardLoan from '../components/card-loan.vue';

export default {
  name: 'home',
  components: { rcnCardLoan },
  data() {
    return {
      loans: [],
    };
  },
  mounted() {
    getOpenLoans().then((res) => {
      res[0].forEach((r) => {
        this.loans.push(r);
      });
      /*
      res.forEach((e) => {
      e.forEach(r => {
        this.loans.push(r)
        })
      }) */
    });
  },
};
</script>
