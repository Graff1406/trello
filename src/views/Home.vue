<template>
  <div class="pa-5 layout">
    <Column
      v-for="desk in desks"
      :key="desk.id"
      :desk='desk'
      @show-error="showError"
    />
    <div style="width:300px">
      <v-card v-if="newDesk" outlined class="ma-2">
        <v-card-text>
          <v-text-field
            v-model="deskTitle"
            hide-details
            placeholder="Enter list title..."
            @keyup.enter="addDeak"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="progress.AddDesk" depressed color="success" @click="addDeak">
            Add card
          </v-btn>
          <v-btn
            icon
            color="secondary"
            @click="closeNewDesk"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-btn v-else depressed color="success" class="ma-2" @click="newDesk = true">
        <v-icon>add</v-icon>
        Add another list
      </v-btn>
    </div>
    <v-snackbar
      v-model="snackbar.show"
      top
      color="error"
    >
      {{snackbar.text}}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Column from '@/components/column/Column'
export default {
  name: 'Home',
  components: {
    Column
  },
  data () {
    return {
      newDesk: false,
      deskTitle: '',
      snackbar: {
        text: '',
        show: false
      },
      progress: {
        delete: false,
        AddDesk: false
      }
    }
  },
  computed: {
    desks () {
      return this.$store.state.home.desks
    }
  },
  created () {
    this.GET_DESKS()
  },
  methods: {
    ...mapActions(['GET_DESKS', 'CREATE_DESK', 'DELETE_DESK']),
    async addDeak () {
      if (this.deskTitle) {
        this.progress.AddDesk = true
        try {
          await this.CREATE_DESK({
            title: this.deskTitle
          })
        } catch (error) {
          this.showError(error)
        } finally {
          this.progress.AddDesk = false
          this.closeNewDesk()
        }
      }
    },
    closeNewDesk () {
      this.deskTitle = ''
      this.newDesk = false
    },
    showError (error) {
      console.error(error)
      this.snackbar.show = true
      this.snackbar.text = error
    }
  }
}
</script>
<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  height: 100vh;
}
</style>
