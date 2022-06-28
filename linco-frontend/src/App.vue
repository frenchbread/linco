<template>
  <nav>
    <router-link to="/">lin.co</router-link>
    &nbsp; | &nbsp;
    <router-link to="/about">about</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
@import 'chartist/dist/scss/chartist.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  background-color: transparent;

  border: 1px solid #42b983;
  border-radius: 3px;

  &:hover {
    background-color: #42b983;
    color: #fff;
    cursor: pointer;
  }
}
</style>
