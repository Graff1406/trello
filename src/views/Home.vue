<template>
  <div class="pa-5 layout">
    <Column
      v-for="(desk, index) in desks"
      :key="desk.id"
      :desk='desk'
      :last-column="index === desks.length - 1"
      @show-error="showError"
      @update-deals="updateDealList"
      @move-to-next="moveToNext"
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
          <v-btn
            :loading="progress.AddDesk"
            color="success"
            id="btn-add-desk"
            depressed
            @click="addDeak"
          >
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
import { mapActions, mapMutations } from 'vuex'
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
    ...mapActions(['GET_DESKS', 'CREATE_DESK', 'DELETE_DESK', 'UPDATE_DESK']),
    ...mapMutations(['SET_DESKS']),
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
    async updateDealList (column) {
      try {
        const desks = this.desks.map(item => {
          if (item.id === column.id) return column
          return item
        })

        this.SET_DESKS(desks)
        await this.UPDATE_DESK(column)
      } catch (error) {
        this.showError(error)
      }
    },
    async moveFrom (dealId, deskId) {
      try {
        const column = this.desks.find(item => item.id === deskId)
        column.deals = column.deals.filter(item => item.id !== dealId)
        const desks = this.desks.map(item => {
          if (item.id === column.id) return column
          return item
        })
        this.SET_DESKS(desks)
        await this.UPDATE_DESK(column)
      } catch (error) {
        this.showError(error)
      }
    },
    async moveTo (dealId, deskId) {
      try {
        const deskIndex = this.desks.findIndex(item => item.id === deskId)
        const deal = this.desks.find(item => item.id === deskId).deals.find(item => item.id === dealId)
        const desks = JSON.parse(JSON.stringify(this.desks))
        if (desks[deskIndex + 1].deals) desks[deskIndex + 1].deals.push(deal)
        else desks[deskIndex + 1].deals = [deal]
        this.SET_DESKS(desks)
        await this.UPDATE_DESK(desks[deskIndex + 1])
      } catch (error) {
        this.showError(error)
      }
    },
    moveToNext ({ dealId, deskId }) {
      this.moveTo(dealId, deskId)
      this.moveFrom(dealId, deskId)
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
