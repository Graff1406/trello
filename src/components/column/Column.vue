<template>
  <v-card class="ma-2 column-desk" outlined>
    <v-card-title>
      <span
        class="subtitle-2"
        style="cursor: pointer"
      >{{ desk.title }}</span>
      <v-spacer></v-spacer>
      <v-btn
        :loading="progress.delete"
        icon
        color="error"
        small
        @click="deleteDesk"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="pa-2">
      <ColumnTask
        v-for="deal in desk.deals"
        :key="deal.id"
        :deal="deal"
        :progress-save="progress.updateForm"
        @delete-task="deleteTask"
        @save="saveDataFormDialog"
      />
      <div class="mt-3">
        <v-text-field
          v-model="dealTitle"
          v-if="newCardCreating"
          hide-details
          solo
          name="input-add-task"
          placeholder="Enter a title for this card..."
        ></v-text-field>
      </div>
    </v-card-text>

    <v-card-actions v-if="!newCardCreating">
      <v-btn depressed @click="newCardCreating = true">
        <v-icon>add</v-icon>
        Add another card
      </v-btn>
    </v-card-actions>

    <v-card-actions v-else>
      <v-btn
        :loading="progress.addCard"
        depressed
        color="success"
        @click="addCard"
      >
        Add card
      </v-btn>
      <v-btn
        icon
        color="secondary"
        @click="newCardCreating = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
import ColumnTask from '@/components/column/ColumnTask'
export default {
  name: 'Column',
  components: {
    ColumnTask
  },
  props: {
    desk: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      newCardCreating: false,
      dealTitle: '',
      deal: {
        title: 'Test deal',
        description: 'Some new description',
        activity: [
          {
            name: 'Avtan',
            text: 'Some text'
          }
        ]
      },
      progress: {
        delete: false,
        addCard: false,
        updateForm: false
      }
    }
  },
  methods: {
    ...mapActions(['DELETE_DESK', 'UPDATE_DESK']),
    async deleteDesk () {
      this.progress.delete = true
      try {
        await this.DELETE_DESK(this.desk.id)
      } catch (error) {
        this.$emit('show-error', error)
      } finally {
        this.progress.delete = false
      }
    },
    async addCard () {
      this.progress.addCard = true
      try {
        if (this.dealTitle) {
          const deals = this.desk.deals
            ? [...this.desk.deals, { title: this.dealTitle, id: this.desk.deals.length + 1 }]
            : [{ title: this.dealTitle, id: 0 }]

          await this.UPDATE_DESK({
            ...this.desk,
            deals
          })
          this.closeAddCard()
        }
      } catch (error) {
        this.$emit('show-error', error)
      } finally {
        this.progress.addCard = false
      }
    },
    async deleteTask (id) {
      try {
        const deals = this.desk.deals
          ? this.desk.deals.filter(deal => deal.id !== id)
          : []

        await this.UPDATE_DESK({
          ...this.desk,
          deals
        })
      } catch (error) {
        this.$emit('show-error', error)
      }
    },
    async saveDataFormDialog (deal) {
      try {
        this.progress.updateForm = true
        const deals = this.desk.deals
          ? this.desk.deals.map((item) => {
            if (item.id === deal.id) return deal
            return item
          })
          : []

        await this.UPDATE_DESK({
          ...this.desk,
          deals
        })
      } catch (error) {
        this.$emit('show-error', error)
      } finally {
        this.progress.updateForm = false
      }
    },
    closeAddCard () {
      this.dealTitle = ''
      this.newCardCreating = false
    }
  }
}
</script>

<style scoped>
.column-desk {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  min-width: 300px;
}
</style>
