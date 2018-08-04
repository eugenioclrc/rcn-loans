<template>
    <div class="card" style="margin: 30px 15px 0 15px; width:290px">
      <!--
      <app-close-button></app-close-button>
      <app-creator-container [loan]=loan></app-creator-container>
      <app-main-button></app-main-button>-->
      <div class="card-content">
        {{creatorBrand}}
        <div class="grid" style="padding:15px">
          <loan-avatar :seed="loan.creator"></loan-avatar>
          <div class="grid vertical justify-around" style="font-weight:500; padding-left: 10px">
            <span style="font-size: 12px;">Created by</span>
            <span>{{loan.creator | formatAddress | shortAddress}}</span>
          </div>
        </div>

        <div class="grid vertical justify-center text-center" style="height: 100px;background-color: #333333;">
          <span style="color: #0c0c0c; font-size: 36px;    font-weight: 900">Unknown</span>
        </div>

        <div style="margin-top: 15px;color: #ffffff; padding:0 15px">
          <div class="card-property">
            Borrower {{ loan.borrower | formatAddress | shortAddress}}
            <div class="title">Borrower</div>
            <div class="paragraph">{{ loan.borrowerShort }}</div>
          </div>
          <div class="card-property">
            <div class="title">Remaining</div>
            <div class="paragraph">{{ verboseDuration }}</div>
          </div>
          <div class="card-property">
            <div class="title">{{ 'Annual Interest / Punitory' }}</div>
            <div class="paragraph"> ~ {{ loan.annualInterest }} % /  ~ {{ loan.annualPunitoryInterest }} %</div>
          </div>
          <div class="lend-return--row">
            <ol>
              <li class="title">{{ 'leftLabel' }}</li>
              <li class="currency">{{ loan.currency }}</li>
              <li class="title">{{ 'rightLabel' }}</li>
            </ol>
          </div>
          <div class="lending-returns--block">
            <ol>
              <li class="block-title">{{ 'leftValue' }}</li>
              <li class="currency"><i class="material-icons" style="font-size: 2em">arrow_forward</i></li>
              <li class="block-title">{{ 'rightValue' }}</li>
            </ol>
          </div>
          <div>
            <a class="button button-primary">Lend</a>
            <a class="button button-secondary">Details</a>
          </div>
        </div>
      <!--
      <app-lend-button [loan]=loan></app-lend-button>
      <app-detail-button [loan]=loan></app-detail-button>
      *-->
    </div>
  </div>
</template>
<style>
.button {
  display: inline-block;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin: 0;
  outline: 0;
  min-width: 76px;
  padding: 8px 6px;
  border-radius: 2px;
}
.button-primary {
  background-color: #4155ff;
}
.button-secondary {
  background-color: #333333;
}
</style>
<script>
import LoanAvatar from './loan-avatar.vue';

function getDecimals(currency) {
  switch (currency.toUpperCase()) {
    case 'ARS':
      return 2;

    case 'MANA':
    case 'ETH':
    case 'RCN':
      return 18;

    case 'BTC':
    case 'BCH':
      return 8;

    default:
      return 0;
  }
}

function formatDelta(e) {
  return e;
}

function formatAddress(hex) {
  return hex.replace(/0x0{48}/, '0x');
}

function timestamp() {
  return (new Date().getTime() / 1000);
}

function formatInterest(raw) {
  return 311040000000000 / raw;
}

function calculateInterest(timeDelta, interestRate, amount) {
  if (amount === 0) {
    return 0;
  }
  return (amount * 100000 * timeDelta) / interestRate;
}
function hexToAscii(str) {
  const hexString = str;
  let strOut = '';
  for (let x = 0; x < hexString.length; x += 2) {
    strOut += String.fromCharCode(parseInt(hexString.substr(x, 2), 16));
  }
  return strOut;
}

function shortAddress(address) {
  return `${address.substr(0, 4)}...${address.substr(-4)}`;
}


/*
ripio: new Brand(
  'Ripio',
  '#009BDE',
  './assets/ripio.png',
  '',
  'Ripio',
  undefined
)

if (this.cosignerService.getCosigner(loan) instanceof DecentralandCosignerProvider) {
  return this.static_brands.decentraland_mortgage;
}

if (environment.dir[loan.creator.toLowerCase()] === Agent.RipioCreator) {
  return this.static_brands.ripio;
}

desenctraland


*/
export default {
  name: 'CardLoan',
  components: { LoanAvatar },
  props: {
    loan: { default: {} },
  },
  computed: {
    creatorBrand() {
      const shortAddressLoanCreator = formatAddress(this.loan.creator);
      const decentraland = [
        '0xea06746f1bd82412f9f243f6bee0b8194d67a67d',
        '0x2bdf545935d4264cbb7457e97d69b6b86458eb64',
        '0x59ccfc50bd19dcd4f40a25459f2075084eebc11e',
        '0x80faa2b517b84a5aec1078d3600eab4c0b3aff56',
      ];

      if (decentraland.indexOf(shortAddressLoanCreator) > -1) {
        return [
          'Mortgage creator',
          '#E59400',
          'https://avatars1.githubusercontent.com/u/12685795?s=400&v=4',
          '',
          'Decentraland',
        ];
      }

      if (shortAddressLoanCreator === '0xdc5fdc6d0c24573c7e2ac3896ab10e376be6da86') {
        return [
          'Ripio',
          'Ripio is one of the leading Bitcoin wallets in Latin America. ... Ripio is offering its services across several Latin American countries.',
          'https://ripio-cms-us.s3.amazonaws.com/filer_public/80/d7/80d76109-a560-446c-9385-d6d911168dbe/logo-ripio-white.svg',
          new Date(),
        ];
      }
      return false;
    },
    loanAvatar() {
      return { // All options are optional
        seed: this.loan.creator, // seed used to generate icon data, default: random
        color: '#4155ff', // to manually specify the icon color, default: random
        bgcolor: '#333333', // choose a different background color, default: random
        size: 10, // width/height of the icon in blocks, default: 8
        scale: 4, // width/height of each block in pixels, default: 4
        spotcolor: '#3444cc', // each pixel has a 13% chance of being of a third color,
        // default: random. Set to -1 to disable it. These "spots" create structures
        // that look like eyes, mouths and noses.
      };
    },
    statusFlag() {
      const statusOptions = ['Request', 'Ongoing', 'Paid', 'Destroyed', 'Indebt'];
      return statusOptions[this.loan.statusFlag];
    },
    status() {
      if (this.statusFlag === 'Ongoing' && timestamp() > this.loan.dueTimestamp) {
        return 'Indebt';
      }
      return this.statusFlag;
    },
    lentTimestamp() {
      return this.loan.dueTimestamp - this.loan.duration;
    },
    remainingTime() {
      return this.loan.dueTimestamp - timestamp();
    },
    rawTotal() {
      let newInterest = this.loan.cumulatedInterest;
      let newPunitoryInterest = this.loan.cumulatedPunnitoryInterest;
      let pending;
      let deltaTime;
      const endNonPunitory = Math.min(timestamp(), this.loan.dueTimestamp);
      if (endNonPunitory > this.loan.interestTimestamp) {
        deltaTime = endNonPunitory - this.loan.interestTimestamp;

        if (this.loan.rawPaid < this.loan.rawAmount) {
          pending = this.loan.rawAmount - this.loan.rawPaid;
        } else {
          pending = 0;
        }

        newInterest += calculateInterest(deltaTime, this.loan.rawAnnualInterest, pending);
      }

      if (timestamp() > this.loan.dueTimestamp) {
        const startPunitory = Math.max(this.loan.dueTimestamp, this.loan.interestTimestamp);
        deltaTime = timestamp() - startPunitory;
        const debt = this.loan.rawAmount + newInterest;
        pending = Math.min(debt, (debt + newPunitoryInterest) - this.loan.rawPaid);
        newPunitoryInterest += calculateInterest(deltaTime, this.loan.rawAnnualPunitoryInterest, pending);
      }

      return this.loan.rawAmount + newInterest + newPunitoryInterest;
    },
    total() {
      return this.rawTotal / (10 ** this.decimals);
    },
    rawPendingAmount() {
      return this.rawTotal - this.loan.rawPaid;
    },
    pendingAmount() {
      return this.rawPendingAmount / (10 ** this.decimals);
    },
    paid() {
      return this.loan.rawPaid / (10 ** this.decimals);
    },
    uid() {
      return this.loan.engine + this.loan.id;
    },
    currency() {
      const targetCurrency = hexToAscii(this.loan.currencyRaw.replace(/^[0x]+|[0]+$/g, ''));

      return targetCurrency || 'RCN';
    },
    decimals() {
      // TODO: Detect fiat currency
      return getDecimals(this.currency);
    },
    amount() {
      return this.loan.rawAmount / (10 ** this.decimals);
    },
    annualInterest() {
      return formatInterest(this.loan.rawAnnualInterest);
    },
    annualPunitoryInterest() {
      return formatInterest(this.loan.rawAnnualPunitoryInterest);
    },
    verboseDuration() {
      return formatDelta(this.loan.duration);
    },
    expectedReturn() {
      return ((this.amount * 100000 * this.loan.duration) / this.loan.rawAnnualInterest) + this.amount;
    },
    borrowerShort() {
      return shortAddress(this.loan.borrower);
    },
  },
  filters: {
    shortAddress(e) {
      return shortAddress(e);
    },
    formatAddress(hex) {
      return formatAddress(hex);
    },
  },
};
</script>
