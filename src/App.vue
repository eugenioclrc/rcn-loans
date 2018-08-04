<template>
  <div id="app">
    <div class="grid align-center" id="nav">
      <div class="cell">
        <img src="./assets/isologotypo.svg" style="height: 45px;">
      </div>
      <div>
        <router-link to="/">Requests</router-link>
        <router-link to="/activity">Activity</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view  class="container" style="margin: 115px auto auto auto;" />
  </div>
</template>

<style lang="scss">
@import 'scss/style.scss';

#nav {
  padding: 7px 15px;
  width: 100%;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.99), transparent);
  position: fixed;
  top: 0;
  z-index: 1;

  a {
    margin-right: 45px;
    font-size: 16px;
    transition: all 0.3s ease-out;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    &:hover {
      color: #4155ff;
    }
    &.router-link-exact-active {
      /*color: #42b983; */
      text-decoration: underline;
    }
  }
}
</style>
