<template>
  <v-container grid-list-md>
    <h1>Order Details</h1>
    <br>

    <v-layout
      v-if="details"
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
              <p><strong>Email:</strong> {{ details.email }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Ticket Number:</strong> {{ details.id }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Paypal ID:</strong> {{ details.paypalPayment }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Ticket Value:</strong> £{{ details.value }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Party Name:</strong> {{ details.partyName }}</p>
            </v-list-tile>
            <v-list-tile>
              <p><strong>Order Date&Time:</strong> {{ details.createdAt | dateTime }}</p>
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
                {{ props.item.gender }}
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <h3 v-else>
      No order found
    </h3>
  </v-container>
</template>

<script>
import Moment from 'moment'
import { mapState } from 'vuex'

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
      ]
    }
  },
  computed: {
    ...mapState('admin', {
      orders: state => state.orders,
      participantsUnfiltered: state => state.participants
    }),
    details () {
      const details = this.orders && this.orders.find(order => order.id === Number(this.$route.params.id))

      return details || null
    },
    participants () {
      const participants = this.participantsUnfiltered && this.participantsUnfiltered.filter(participant => participant.orderId === Number(this.$route.params.id))

      return participants
    }
  }
}
</script>
