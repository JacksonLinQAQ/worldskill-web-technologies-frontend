<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

let user_auth = useAuthStore()

user_auth.alert_msgs = []
</script>

<template>
  <div class="signup-window">
    <h2>Signup</h2>
    <h3>Welcome to our website!</h3>
    <form @submit.prevent="user_auth.onSignup">
      <input type="text" placeholder="Username" v-model="user_auth.login_form.username">
      <input type="password" placeholder="Password" v-model="user_auth.login_form.password">
      <input type="password" placeholder="Confirm Password" v-model="user_auth.login_form.confirm_password">
      <div class="spacing-controller">
        <input type="submit" value="Login">
      </div>
    </form>
  </div>
</template>

<style scoped>
  div.signup-window {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 290px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .1);
    padding: 20px;
  }

  div.signup-window > h3 {
    margin-top: 10px;
    color: #ccc;
    font-size: 16px;
  }

  div.signup-window > form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  div.signup-window > form > input[type=text],
  div.signup-window > form > input[type=password],
  div.signup-window > form > div.spacing-controller > input[type=submit]
  {
    padding: 8px;
    border-radius: 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #eee;
    transition: 0.1s ease-in-out;
    background-color: transparent;
  }

  div.signup-window > form > input[type=text]:hover,
  div.signup-window > form > input[type=password]:hover
  {
    border-bottom: 1.2px solid #c9c8c8;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, .1);
  }

  div.signup-window > form > div.spacing-controller > input[type=submit]:hover
  {
    border-bottom: 1.2px solid #53c8f7;
    color: #53c8f7;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, .1);
    cursor: pointer;
  }

  div.signup-window > form > input[type=text]:focus,
  div.signup-window > form > input[type=password]:focus
  {
    border-bottom: 1.2px solid #53c8f7;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, .1);
  }

  div.signup-window > form > div.spacing-controller {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
</style>
