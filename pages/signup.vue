<template>
  <v-layout justify-center align-center column>
    <h1 class="title text-uppercase my-3">Create your account</h1>
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
              validate-on-blur
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
              validate-on-blur
            />
            <v-select
              ref="department"
              v-model="user.department"
              :items="departments"
              name="department"
              label="department"
              prepend-icon="mdi-account-group-outline"
              :rules="[rules.required]"
              validate-on-blur
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
              validate-on-blur
            />
            <v-text-field
              ref="username"
              v-model="user.username"
              label="Username"
              name="username"
              placeholder="JohnDoe123"
              prepend-icon="mdi-account-box-outline"
              :rules="[rules.required]"
              validate-on-blur
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
              validate-on-blur
              @click:append="isPasswordVisible = !isPasswordVisible"
            />
          </div>

          <v-btn color="primary" @click="moveStepThree">
            Continue
          </v-btn>

          <v-btn text @click="formStepper = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-alert
            v-if="error.status"
            v-model="error.status"
            type="error"
            dismissible
          >
            {{ error.message }}
          </v-alert>
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

          <v-btn color="primary" :loading="loading" @click="signUp">
            Sign Up
          </v-btn>

          <v-btn text @click="formStepper = 2">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <p class="my-3 subtitle-2">
      Already have an account? <router-link to="login">Sign in</router-link>
    </p>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    isPasswordVisible: false,
    formStepper: 1,
    loading: false,
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
    error: {
      status: false,
      message: '',
    },
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
      this.loading = true;
      this.$axios
        .post('users/register', this.user)
        .then((res) => {
          console.log(res);
          this.loading = false;
        })
        .catch((err) => {
          const {
            data: { errors },
          } = err.response;
          const firstError = errors && Object.values(errors[0]);
          if (firstError) {
            this.error.message = firstError;
          }
          this.loading = false;
          this.error.status = true;
        });
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
