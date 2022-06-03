<template>
  <div id="app">
    <b-navbar id="navbar" toggleable="xl" variant=white>
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
            <b-nav-item  href="/#/projects">Projects</b-nav-item >
            <b-nav-item  href="/#/publications">Publications</b-nav-item>
            <b-nav-item  href="/#/blog">Blog</b-nav-item>
            <b-nav-item  href="/#/contacts">Contacts</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    <router-view id="view"/>
  </div>
</template>

<style lang="scss">
#view {
  background-color: var(--primary);
  color: black;
}

@media screen and (min-width: 1024px) {
  #view {
    height: 85% !important;
  }
  #navbar {
    height: 11% !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px){
  #view {
    height: 85% !important;
  }
  #navbar {
    min-height: 11% !important;
  }
}

@media screen and (max-width: 767px){
  #view {
    height: 80% !important;
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
  height: 100%;
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
