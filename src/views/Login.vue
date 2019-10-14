<style>
  .login {
    background-image: url('https://mdbootstrap.com/img/Photos/Others/images/93.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100vh;

  }
</style>
<template>
  <div class="login">
    <b-container>
      <b-row>
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'login',
  components: {
    LoginForm
  }
}
</script>
