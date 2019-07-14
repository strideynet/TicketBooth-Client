<template>
  <v-container grid-list-md>
    <h1>Order Details</h1>
    <br>

    <v-layout
      v-if="order"
      wrap
    >
      <v-flex
        xs12
        lg4
      >
        <v-card>
          <v-card-title><h4>Order</h4></v-card-title>
          <v-divider />
          <v-list dense>
            <v-list-tile>
              <p><strong>Email:</strong> {{ order.email }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Ticket Number:</strong> {{ order.id }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Paypal ID:</strong> {{ order.paypalPayment }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Ticket Value:</strong> £{{ order.value }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Party Name:</strong> {{ order.partyName }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Order Date & Time:</strong> {{ order.createdAt | dateTime }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Status:</strong> {{ order.status }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Type:</strong> {{ order.type }}</p>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        lg8
      >
        <v-card>
          <v-card-title><h4>Participants</h4></v-card-title>
          <v-divider />
          <v-data-table
            :items="participants"
            :headers="headers"
            hide-actions
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td>
                {{ props.item.id }}
              </td>
              <td>
                {{ props.item.first }} {{ props.item.last }}
              </td>
              <td>
                {{ props.item.dob | date }}
              </td>
              <td>
                {{ props.item.nick }}
              </td>
              <td>
                {{ props.item.mobile || 'None specified' }}
              </td>
              <td>
                {{ props.item.gender }}
              </td>
              <td>
                <v-icon
                  class="mr-2"
                  @click="modifyParticipant(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  @click="deleteParticipant(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <h3 v-else>
      No order found
    </h3>
    <v-dialog
      v-model="showModal"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">
            {{ modifiedParticipant.first }} {{ modifiedParticipant.last }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md4>
                <v-text-field
                  v-model="modifiedParticipant.first"
                  label="First Name"
                />
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="modifiedParticipant.last"
                  label="Last Name"
                />
              </v-flex>
              <v-flex md4>
                <v-text-field
                  v-model="modifiedParticipant.nick"
                  label="Nick Name"
                />
              </v-flex>

              <v-flex md6>
                <v-select
                  v-model="modifiedParticipant.gender"
                  :items="genderOptions"
                  label="Gender"
                />
              </v-flex>

              <v-flex md6>
                <v-text-field
                  v-model="modifiedParticipant.mobile"
                  label="Mobile Number"
                />
              </v-flex>

              <v-flex md12>
                <v-text-field
                  slot="activator"
                  v-model="modifiedParticipant.dob"
                  label="Birth date"
                  prepend-icon="event"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            flat
            @click="showModal = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="saveParticipant"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Moment from 'moment'
import { genderOptions } from '@/helpers/constants'

export default {
  name: 'AdminOrderDetails',
  filters: {
    date (value) {
      let date = new Moment(value)

      return date.format('DD/MM/YYYY')
    },
    dateTime (value) {
      let date = new Moment(value)

      return date.format('DD/MM/YYYY HH:mm:ss')
    }
  },
  data () {
    return {
      headers: [
        {
          text: 'ID',
          value: 'id',
          sortable: false
        },
        {
          text: 'Name',
          value: 'first',
          sortable: false
        },
        {
          text: 'Date of Birth',
          value: 'dob',
          sortable: false
        },
        {
          text: 'Nickname',
          value: 'nick',
          sortable: false
        },
        {
          text: 'Mobile',
          value: 'mobile',
          sortable: false
        },
        {
          text: 'Gender',
          value: 'gender',
          sortable: false
        },
        {
          text: 'Actions',
          value: 'id',
          sortable: false
        }
      ],
      showModal: false,
      dateSelector: false,
      modifiedParticipant: {
      },
      genderOptions
    }
  },
  computed: {
    order () {
      return this.$store.state.admin.orders.find(order => order.id === Number(this.$route.params.id))
    },
    participants () {
      return this.$store.state.admin.participants.filter(participant => participant.orderId === Number(this.$route.params.id))
    }
  },
  methods: {
    saveDate (date) {
      this.$refs.dateSelector.save(date)
    },
    deleteParticipant (participant) {
      if (confirm('Are you sure you want to delete this participant?')) {
        this.$store.dispatch('admin/deleteParticipant', participant)
      }
    },
    /**
     * Creates modal dialogue for modifying participant
     * @param participant
     */
    modifyParticipant (participant) {
      this.modifiedParticipant = Object.assign({}, participant)
      this.showModal = true
    },
    async saveParticipant () {
      this.$store.dispatch('admin/patchParticipant', this.modifiedParticipant)
      this.showModal = false
    }
  }
}
</script>
