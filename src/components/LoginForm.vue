<template>
    <div class="login-form">
        <div class="text-center">
            <img src="fly.png" alt="" width="112" height="112">
        </div>
        <hr>
        <b-form @submit.prevent="onsubmit">
            <div class="text-center">
            <b-alert variant="danger" :show="hasError"> {{ error }} </b-alert>
            <b-form-group id="userInputGroup"
                <b-form-input id="userInput"
                              type="text"
                              placeholder="User Name"
                              v-model="userId"
                              autocomplete="off"
                              :disabled="loading"
                              required>
                </b-form-input>
            </b-form-group>

                <b-button type="submit"
                          variant="primary"
                          class="ld-ext-right"
                          v-bind:class=" { running: loading}"
                          :disabled="isValid">
                    Login <div class="ld ld.ring ld-spin"></div>
                </b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
    import {mapState, mapGetters } from 'vuex'

    export default {
        name: 'login-form',
        data() {
            return {
                userId: '',
            }
        },
        computed: {
            isValid: function() {
                const result = this.userId.length < 3;
                return result ? result : this.loading
            },
            ...mapState([
                'loading',
                'error'
            ]),
            ...mapGetters([
                'hasError'
            ])
        }
    }
</script>
