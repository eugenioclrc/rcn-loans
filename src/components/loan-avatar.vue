<template>
  <img :src="dataurl" style="border-radius: 40px" />
</template>

<script>
import blockies from 'ethereum-blockies';

// if i dont do this the first random is black :S
blockies.create({});

export default {
  name: 'blocky',
  props: {
    seed: String,
  },
  computed: {
    dataurl() {
      const opts = {
        seed: this.seed,
        color: '#4155ff',
        bgcolor: '#333333',
        size: 10,
        scale: 4,
        spotcolor: '#3444cc',
      };
      const icon = blockies.create(opts);
      return icon.toDataURL();
    },
  },
};
</script>
