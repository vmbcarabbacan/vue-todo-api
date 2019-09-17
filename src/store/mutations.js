export default {
    startedDialogCommit(state, payload) {
        state.startedDialog = payload
    },
    openSnackbar(state, payload) {
        state.snackbar.isOpen = true,
            state.snackbar.isText = payload
    },
    currentUser(state, payload) {
        state.currentUser = payload
    },
    retrieveTodos(state, payload) {
        state.todos = payload
    },
    addTodo(state, payload) {
        state.todos.push(payload)
    }
}