<template>
  <div id="app">
    <b-navbar variant=primary>
      <div style="display: block; width: 100%;">
        <div style="font-size: 40pt; color: black">Nuno Saavedra</div>
        <b-navbar-nav style="margin-left: 27.5%; width: 45%;" align="center" justified=true>
          <b-nav-item  href="/">Home</b-nav-item >
          <b-nav-item  href="/about">About Me</b-nav-item>
          <b-nav-item  href="/projects">Projects</b-nav-item >
          <b-nav-item  href="/publications">Publications</b-nav-item>
          <b-nav-item  href="/contacts">Contacts</b-nav-item>
        </b-navbar-nav>
      </div>
    </b-navbar>
    <router-view/>
  </div>
</template>

<style lang="scss">
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
</style>
