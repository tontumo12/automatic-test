<template>
    <b-container>
        <b-row cols="8">
            <b-col offset-lg="2" class="mt-5 pt-5">
                <b-card title="Đăng nhập" tag="div" style="max-width: 40rem;" class="mb-2 text-left">
                    <b-card-text>
                        <b-form @submit.stop.prevent>
                            <p>Đăng nhập TalaTula để trải nghiệm</p>
                            <div role="group">
                                <label for="input-live">User Name:</label>
                                <b-form-input id="input-live" v-model="username" :state="nameState"
                                    aria-describedby="input-live-help input-live-feedback" placeholder="Enter your name" trim>
                                </b-form-input>

                                <!-- This will only be shown if the preceding input has an invalid state -->
                                <b-form-invalid-feedback id="input-live-feedback">
                                    Enter at least 3 letters
                                </b-form-invalid-feedback>
                            </div>
                            <label for="text-password">Password</label>
                            <b-input type="password" id="text-password" v-model="password" aria-describedby="password-help-block">
                            </b-input>
                        </b-form>
                    </b-card-text>
                    <b-button block variant="info" @click="login()">Đăng nhập</b-button>
                    <p class="mt-2">Bạn chưa có tài khoản? <b-link href="/resiter">Đăng ký ngay</b-link>
                    </p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
    // import jwt from 'jsonwebtoken'
    // import router from '@/router'
    export default {
        data() {
            return {
                username: '',
                password: '',
                test: {}
            }
        },
        computed: {
            nameState() {
                return this.username.length > 2 ? true : false
            }
        },
        methods: {
            login() {
                let a = {
                    username: this.username,
                    password: this.password
                }
                console.log(a)
            },
            alertSuccess(data) {
                const {
                    dispatch
                } = this.$store;
                dispatch('alert/success', `${data}`)
            },
            alertError(data) {
                const {
                    dispatch
                } = this.$store;
                dispatch('alert/error', `${data}`)
            },
        }
    }
</script>