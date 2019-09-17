<template>
  <v-card>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card-text>
            <v-data-table :headers="headers" :items="items">

              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>My To-do</v-toolbar-title>
                  <v-divider
                    class="mx-4"
                    inset
                    vertical
                  ></v-divider>
                  <div class="flex-grow-1"></div>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                      <v-btn color="primary" dark class="mb-2" v-on="on">New Todo</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" >
                              <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                            </v-col>
                            <v-col cols="12" v-if="editedIndex != -1">
                              <v-checkbox v-model="editedItem.isComplete" label="isCompleted?"></v-checkbox>
                            </v-col>
                            
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.isComplete="{ item }">
                <v-checkbox v-model="item.isComplete" ></v-checkbox>
              </template>

              <template v-slot:item.action="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  delete
                </v-icon>
              </template>
              <template v-slot:no-data>
                No item found
              </template>
            </v-data-table>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
      editedIndex: -1,
      headers: [
        { text: 'Title', align: 'left', sortable: true, value: 'title' },
        { text: 'IsComplete', align: 'left', sortable: true, value: 'isComplete' },
        { text: 'Action', align: 'left', sortable: true, value: 'action'}
      ],
      editedItem: {
        id: '',
        title: '',
        isComplete: false,
        timestamp: ''
      }
    }
  },

  methods: {
    save() {
      if(this.editedIndex == -1) {
          this.$store.dispatch('addTodo', {
          title: this.editedItem.title
        })
        this.close()
        this.$store.commit('openSnackbar', this.editedItem.title + ' has been saved!')
      } else {
        this.$store.dispatch('updateTodo', {
          id: this.editedItem.id,
          title: this.editedItem.title,
          isComplete: this.editedItem.isComplete,
        })
        this.close()
        this.$store.commit('openSnackbar', this.editedItem.title + ' has been updated!')
      }
    },
    close() {
      this.editedItem = {
          id: '',
          title: '',
          isComplete: false,
          timestamp: ''
        }
        this.editedIndex = -1
      this.dialog = false
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = item
      this.dialog = true
    },
    deleteItem(item) {
      this.$store.dispatch('deleteTodo', {
        id: item.id
      })
      this.$store.commit('openSnackbar', item.title +' has been deleted!')
    }
  },

  computed: {
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    items() {
      return this.$store.state.todos
    }
    
  }
  
};
</script>
