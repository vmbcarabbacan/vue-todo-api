<template>
    <v-snackbar
      v-model="$store.state.snackbar.isOpen"
    >
      {{ $store.state.snackbar.isText }}
      
    </v-snackbar>
</template>
<script>
export default {
    name: 'snackbar',
    computed: {
        snackbar() {
            this.$store.state.snackbar
        }
    }
}
</script>