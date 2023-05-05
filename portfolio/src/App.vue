<template>
  <div id="app">
    <b-navbar style="min-height: 160px" id="navbar" toggleable="xl" variant=white>
      <div style="display: block; width: 100%;">
        <div id="logo-name">Nuno Saavedra</div>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav style="margin-left: 25%; width: 50%;" align="center" justified>
            <b-nav-item  href="/">Home</b-nav-item >
            <b-nav-item  href="/#/about">About Me</b-nav-item>
            <!-- <b-nav-item  href="/#/projects">Projects</b-nav-item > -->
            <b-nav-item  href="/#/publications">Publications</b-nav-item>
            <!-- <b-nav-item  href="/#/blog">Blog</b-nav-item> -->
            <!-- <b-nav-item  href="/#/contacts">Contacts</b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <router-view id="view" style="padding-bottom: 4vh;"/>
    <footer class="justify-content-center justify-content-xl-between">
      <div class="d-none d-xl-block" style="margin-left: 12vh"/>
      <div>©2022-2023 Nuno Saavedra</div>
      <div class="d-none d-xl-block">
        <b-avatar href="mailto: nuno@saavedra.pt" style="background-color: white;" size="3vh" target="_blank" src="img/email.svg"></b-avatar>
        <b-avatar href="https://github.com/Nfsaavedra" style="background-color: white;" size="3vh" target="_blank" src="img/github.svg"></b-avatar>
        <b-avatar href="https://scholar.google.com/citations?user=iYiwTYUAAAAJ" style="background-color: #535e79;" size="3vh" target="_blank" src="img/scholar.svg"></b-avatar>
        <b-avatar href="https://twitter.com/nunofsaavedra" style="background-color: #535e79;" size="3vh" target="_blank" src="img/twitter.svg"></b-avatar>
        <b-avatar href="https://orcid.org/0000-0003-4148-5991" style="background-color: white;" size="3vh" target="_blank" src="img/orcid.svg"></b-avatar>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'App',    
    metaInfo() {
      return { 
          meta: [
            { 'http-equiv': 'cache-control', content: 'no-cache' },    
            { 'http-equiv': 'expires', content: '0' },
            { 'http-equiv': 'pragma', content: 'no-cache' },    
          ]
      };
    }
}
</script>

<style lang="scss">
footer {
  height: 4vh; 
  width: 100%; 
  background-color: white; 
  position: fixed; 
  bottom: 0;
  display: flex !important;
  justify-content: space-between;
  align-items: center;
}

footer > div > .b-avatar {
  margin-right: 1vh;
}

#view {
  background-color: var(--primary);
  color: black;
}

@media screen and (min-width: 1024px) {
  #view {
    height: 82% !important;
  }

  #navbar {
    height: 11% !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  #view {
    height: 82% !important;
  }

  #navbar {
    min-height: 11% !important;
  }
}

@media screen and (max-width: 767px){
  #view {
    height: 77% !important;
  }

  #navbar {
    min-height: 16% !important;
  }
}

h1 {
  margin-top: 2% !important; 
  margin-bottom: 2% !important;
}

html, body {
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: var(--primary) !important;
}

@font-face {
  font-family: "Lobster";
  src: local("Lobster"), url("./fonts/Lobster/Lobster-Regular.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "Nunito";
  src: url("./fonts/Nunito/NunitoSans-Regular.ttf");
  font-display: swap;
}

@font-face {
  font-family: "Nunito";
  src: url("./fonts/Nunito/NunitoSans-Bold.ttf");
  font-weight: bold;
  font-display: swap;
}

#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--primary);
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

#logo-name {
  font-size: 40pt; 
  color: black; 
  font-family: "Lobster", Helvetica, Arial;
}

.nav-link {
  font-size: 20px;
}

.nav-link:hover {
  color: var(--danger) !important;
}
</style>
