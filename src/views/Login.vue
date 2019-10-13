<template>
    <div class="login">
        <b-container align-v="center" align-h="center">
            <b-row>
                <b-col lg="4" md="3"></b-col>
                <b-col lg="4" md="6">
                    <LoginForm />
                </b-col>
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
