<template>
  <v-container grid-list-md>
    <h1>
      Admin Dashboard
    </h1>
    <br>
    <v-layout row wrap>
      <v-flex
        xs12
        md4
      >
        <v-card title="Participants">
          <div class="text-xs-center">
            <span class="display-3 text-xs-center">
              {{ participantCount }}
            </span><br>
            <span class="subheading text-xs-center">
              Participants
            </span>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-card title="Participants">
          <div class="text-xs-center">
            <span class="display-3 text-xs-center">
              {{ orderCount }}
            </span><br>
            <span class="subheading text-xs-center">
              Orders
            </span>
          </div>
        </v-card>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <v-card>
          <div class="text-xs-center">
            <span class="display-3 text-xs-center">
              £{{ orderValue }}
            </span><br>
            <span class="subheading text-xs-center">
              Revenue
            </span>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <h2>
      Participant Stats
    </h2>
    <h2>
      Order Stats
    </h2>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminDashboard',
  computed: {
    ...mapState('admin', {
      participantCount: state => state.participants.length,
      orderCount: state => state.orders.length,
      orderValue: state => state.orders.reduce((sum, order) => sum + Number(order.value), 0)
    })
  }
}
</script>
