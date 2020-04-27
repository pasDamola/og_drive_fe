<template>
  <!-- <v-layout column class="login" justify-center align-center>
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
  </v-layout> -->
  <v-layout justify-center align-center>
    <v-stepper v-model="formStepper">
      <v-stepper-header>
        <v-stepper-step :complete="formStepper > 1" step="1">
          Company Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="formStepper > 2" step="2">
          User Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">User Photo</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="my-3">
            <v-text-field
              ref="ogId"
              v-model="user.ogId"
              label="OG-ID"
              name="id"
              maxlength="6"
              placeholder="191852"
              prepend-icon="mdi-account-key-outline"
              :rules="[rules.required, rules.isNumber]"
            />
            <v-text-field
              ref="email"
              v-model="user.email"
              label="Email"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              prepend-icon="mdi-at"
              :rules="[rules.required, rules.email]"
            />
            <v-select
              ref="department"
              v-model="user.department"
              :items="departments"
              name="department"
              label="department"
              prepend-icon="mdi-account-group-outline"
              :rules="[rules.required]"
              single-line
            />
          </div>
          <v-btn color="primary" @click="moveStepTwo">
            Continue
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="my-3">
            <v-text-field
              ref="full_name"
              v-model="user.full_name"
              label="Full Name"
              name="Full Name"
              placeholder="John Doe"
              prepend-icon="mdi-account-outline"
              :rules="[rules.required, rules.isAlpha]"
            />
            <v-text-field
              ref="username"
              v-model="user.username"
              label="Username"
              name="username"
              placeholder="JohnDoe123"
              prepend-icon="mdi-account-box-outline"
              :rules="[rules.required]"
            />
            <v-text-field
              ref="password"
              v-model="user.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="********"
              prepend-icon="mdi-account-lock-outline"
              :append-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="[rules.required, rules.password]"
              @click:append="isPasswordVisible = !isPasswordVisible"
            />
          </div>

          <v-btn color="primary" @click="moveStepThree">
            Continue
          </v-btn>

          <v-btn text @click="formStepper = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <input
            id="user-photo"
            type="file"
            name="user-photo"
            @change="handleImage"
          />
          <label for="user-photo" class="picture-upload">
            <v-icon size="50" color="white">
              mdi-camera-plus-outline
            </v-icon>
            <img id="user-image" src="" alt="User's image" />
          </label>

          <v-btn color="primary" @click="signUp">
            Sign Up
          </v-btn>

          <v-btn text @click="formStepper = 2">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    isPasswordVisible: false,
    formStepper: 3,
    user: {
      ogId: '',
      email: '',
      department: '',
      full_name: '',
      username: '',
      password: '',
      image: '',
      role: 'user',
    },
    departments: ['Software', 'IT', 'Legal'],
    rules: {
      required: (value) => !!value || 'Required.',
      password: (value) => value.length >= 8 || 'Required',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
      },
      isAlpha: (value) => {
        return /^[a-zA-Z ]+$/.test(value) || 'Name can only contain letters';
      },
      isNumber: (value) => {
        return /^[0-9]+$/.test(value) || 'ID can only contain numbers';
      },
    },
  }),
  computed: {
    stepOne() {
      return {
        ogId: this.user.ogId,
        email: this.user.email,
        department: this.user.department,
      };
    },
    stepTwo() {
      return {
        full_name: this.user.full_name,
        username: this.user.username,
        password: this.user.password,
      };
    },
  },
  methods: {
    moveStepTwo() {
      const keys = Object.keys(this.stepOne);
      for (let key of keys) {
        if (!this.$refs[key].validate()) {
          this.$refs[key].validate(true);
          return;
        }
      }
      this.formStepper = 2;
    },
    moveStepThree() {
      const keys = Object.keys(this.stepTwo);
      for (let key of keys) {
        if (!this.$refs[key].validate()) {
          this.$refs[key].validate(true);
          return;
        }
      }
      this.formStepper = 3;
    },
    handleImage(image) {
      const files = image.target.files;
      const imageElement = document.querySelector('#user-image');
      if (files && files[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
          console.log(e);
          imageElement.style.display = 'block';
          imageElement.src = e.target.result;
          // imageElement.style.backgroundImage = `url(${e.target.result})`;
        };
        this.user.image = files[0];
      }
    },
    signUp() {
      console.log(this.user);
    },
  },
};
</script>
<style lang="scss" scoped>
#user-photo {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
}

#user-photo:hover + .picture-upload,
#user-photo:focus + .picture-upload {
  &::before {
    background-color: rgba($color: #000, $alpha: 0.4);
  }
}

#user-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: none;
}

.picture-upload {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px auto;
  display: block;
  background-image: url('https://source.unsplash.com/random/600x600');
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .v-icon {
    position: absolute;
  }
  &::before {
    transition: background-color 0.09s ease-in;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    border-radius: 50%;
    background-color: rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
