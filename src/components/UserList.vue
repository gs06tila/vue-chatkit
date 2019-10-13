<template>
    <div class="user-list">
        <h4>Members</h4>
        <hr>
        <b-list-group v-for="user in users" :key="user.username">
            {{ user.name }}
            <b-badge v-if="user.presence"
                     :variant="statusColor(user.presence)"
                     pill>
                {{ user.presence }}
            </b-badge>
        </b-list-group>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'user-list',
        compudet: {
            ...mapState([
                'loading',
                'users'
            ])
        },
        methods: {
            statusColor(status) {
                return status === 'online' ? 'success' : 'warning'
            }
        }
    }
</script>

<style>
    .message-list {
        margin-bottom: 15px;
        padding-right: 15px;
    }

    .message-group {
        height: 65vh !important;
        overflow-y: scroll;
    }
</style>
