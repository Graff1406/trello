<template>
  <div class="my-2">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card elevation="1">

          <v-card-text>
            {{deal.title}}
          </v-card-text>

          <v-fade-transition>
            <v-overlay
              v-if="hover"
              absolute
              opacity="0.1"
            >
              <v-btn
                icon
                color="secondary"
                class="mx-2"
                @click="dialog = true"
              >
                <v-icon>edit</v-icon>
              </v-btn>

              <v-btn
                icon
                color="error"
                class="mx-2"
                @click="$emit('delete-task', deal.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>

              <v-btn
                v-if="!lastColumn"
                icon
                color="success"
                class="mx-2"
                @click="$emit('move-to-next')"
              >
                <v-icon>arrow_forward</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>

    <v-dialog
      v-model="dialog"
      width="600"
    >
      <v-card>
        <v-progress-linear
          v-if="progressSave"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-card-title primary-title>
          Edit task
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
              v-model="form.title"
              @blur="saveTask(form.title)"
              placeholder="Title"
              ref="titleField"
              outlined
              hide-details
            ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
              v-model="form.description"
              @blur="saveTask(form.description)"
              hide-details
              filled
              rows="2"
              name="input-7-4"
              placeholder="Description"
            ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            id="btn-close"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ColumnTask',
  props: {
    deal: {
      type: Object,
      default: () => ({})
    },
    progressSave: Boolean,
    lastColumn: Boolean
  },
  data () {
    return {
      dialog: false,
      titlefield: false,
      descriptionBtns: false,
      form: {}
    }
  },
  watch: {
    dialog (dialog) {
      if (dialog) this.form = { ...this.form, ...this.deal }
    }
  },
  methods: {
    saveTask (text) {
      if (text) this.$emit('save-task', this.form)
    }
  }
}
</script>
<style scoped>
.title-height {
  height: 70px;
}
.description {
  min-height: 40px;
  cursor: pointer;
}
</style>
