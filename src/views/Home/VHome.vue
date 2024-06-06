<template>
  <div class="app">
    <nav>
      <div class="navbar">
        <div class="container nav-container">
          <input class="checkbox" type="checkbox" name="" id="" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <div class="logo">
            <h1>Navbar</h1>
          </div>
        </div>
      </div>
    </nav>
    <div class="body">
      <div class="menu">
        <div class="menu-items">
          <li><a href="#">Home</a></li>
          <li><a href="#">about</a></li>
          <li><a href="#">blogs</a></li>
          <li><a href="#">portfolio</a></li>
          <li><a href="#">contact</a></li>
        </div>
      </div>
      <div class="main">
        content
      </div>
    </div>






  </div>
</template>

<script lang='ts'>
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import LocalStorageService from '@/services/LocalStorageService'
import AuthRepository from '@/repositories/AuthRepository'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import { ref } from 'vue'

export default {
  name: 'VHome',
  props: {},
  components: {
    Menubar,
    Avatar,
    InputText,
    Badge
  },

  setup(props) { },

  methods: {
    logout() {
      AuthRepository.logout().finally(() => {
        LocalStorageService.clearAuthInfo()
        this.$router.push({ name: 'VLogin' })
      })
    }
  },

  watch: {},
  computed: {}
}
</script>

<style lang="scss">
body {
  font-family: "Poppins", sans-serif;
}

.container {
  max-width: 1360px;
  // width: 90%;
  margin: auto;
}

.navbar {
  width: 100%;
  box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
}

.navbar .menu-items {
  display: flex;
}

.navbar .nav-container li {
  list-style: none;
}

.navbar .nav-container a {
  text-decoration: none;
  color: #0e2431;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.7rem;
}

.navbar .nav-container a:hover {
  font-weight: bolder;
}

.nav-container {
  display: block;
  position: relative;
  height: 60px;
}

.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 20px;
  left: 20px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.nav-container .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #0e2431;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.logo {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 1.2rem;
  color: #0e2431;
}

.nav-container input[type="checkbox"]:checked~.menu-items {
  transform: translateX(0);
}

.nav-container input[type="checkbox"]:checked~.hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked~.hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked~.hamburger-lines .line3 {
  transform: rotate(-45deg);
}

// menu
.main {
  // width: 1080px;
  width: 100%;
  border: 1px solid black;
  z-index: 1;
  background-color: white;
}

.menu {
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  width: 0px;
  z-index: -1;
}
.menu-items {
  width: 300px;
}

.body {
  display: flex;
  margin: 0 auto;
  max-width: 1360px;
  transition: max-width 0.3s ease-in-out;
  border: 1px solid black;
  height: 100vh;
}

.app:has(input[type="checkbox"]:checked) {
  .body {
    .menu {
      transform: translateX(0);
      transition: transform 0.3s ease-in-out;
      transition: width 0.3s ease-in-out;
      width: 300px;
    }
  }

  .navbar .container {
    transition: max-width .3s ease-in-out;
  }
}

.app:has(input[type="checkbox"]:not(:checked)) {
  .menu {
    transition: all .3s ease-in-out;
  }

  .body {
    max-width: 1080px;
  }

  .navbar .container {
    max-width: 1080px;
    transition: max-width .3s ease-in-out;
  }
}
</style>
