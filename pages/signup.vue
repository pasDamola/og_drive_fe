<template>
  <v-layout v-if="!showLoader" column class="login" justify-center align-center>
    <h3 class="headline font-weight-bold text--black">
      Create your OG Drive account
    </h3>
    <v-form>
      <v-text-field
        light
        label="OG-ID"
        placeholder="012345"
        filled
        color="#1da1f2"
        background-color="rgb(245, 248, 250)"
        hide-details
        class="mx-3 my-5"
      />
      <v-text-field
        light
        label="Full Name"
        placeholder="John Doe"
        filled
        color="#1da1f2"
        background-color="rgb(245, 248, 250)"
        hide-details
        class="mx-3 my-5"
      />
      <v-text-field
        light
        label="Department"
        placeholder="Software Development"
        filled
        color="#1da1f2"
        background-color="rgb(245, 248, 250)"
        hide-details
        class="mx-3 my-5"
      />
      <div class="mx-3">
        <v-text-field
          hint="Password"
          :type="isPassword ? 'password' : 'text'"
          :append-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          placeholder=" "
          light
          filled
          color="#1da1f2"
          background-color="rgb(245, 248, 250)"
          hide-details
          @click:append="isPassword = !isPassword"
        />
      </div>
      <v-btn
        depressed
        color="primary"
        min-height="50"
        rounded
        class="my-4 mx-3"
        @click="logIn()"
      >
        Create Account
      </v-btn>
    </v-form>
    <v-layout class="my-4">
      <a href="/login">Sign in instead</a>
    </v-layout>
  </v-layout>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.login {
  width: 500px;
  margin: 50px auto;
  max-width: calc(100% - 30px);
  padding: 0 15px;
  img {
    width: 40px;
    margin: 30px 0;
  }
  h3 {
    color: black !important;
  }
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  &-actions {
    font-size: 0.85rem;
    width: 230px;
    max-width: 100%;
    margin: 0 auto;
  }
}
</style>
