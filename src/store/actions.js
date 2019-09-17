import { fs } from '../firebase';

export default {
    retrieveTodos(context) {
        fs.collection('todo').get()
            .then((result) => {
                let tempTodo = []
                result.forEach(doc => {
                    const data = {
                            id: doc.id,
                            title: doc.data().title,
                            isComplete: doc.data().isComplete,
                            timestamp: doc.data().timestamp
                        }
                        // console.log(doc.data())
                    tempTodo.push(data)
                })
                const sortTodo = tempTodo.sort((a, b) => {
                    return a.timestamp.seconds - b.timestamp.seconds;
                })
                context.commit('retrieveTodos', sortTodo);
            })

    },
    addTodo(context, payload) {
        fs.collection('todo').add({
                title: payload.title,
                isComplete: false,
                timestamp: new Date()
            })
            .then(result => {
                // console.log(result)
                context.commit('addTodo', {
                    id: result.id,
                    title: payload.title
                })
            })
    },
    deleteTodo(context, payload) {
        fs.collection('todo').doc(payload.id).delete()
            .then(() => {
                context.dispatch('retrieveTodos')
            }).catch((err) => {

            });
    },
    updateTodo(context, payload) {
        fs.collection('todo').doc(payload.id).set({
                id: payload.id,
                title: payload.title,
                isComplete: payload.isComplete,
                timestamp: new Date()
            })
            .then(() => {
                context.dispatch('retrieveTodos')
            }).catch((err) => {

            });
    }
}