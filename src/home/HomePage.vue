<template>
  <div>
    <h1>Hi {{ account.user.firstName }}!</h1>
    <p>You're logged in with Vue + Vuex & JWT!!</p>
    <h3>Users from secure api end point:</h3>
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        {{ user.firstName + " " + user.lastName }}
        <span v-if="user.deleting"><em> - Deleting...</em></span>
        <span v-else-if="user.deleteError" class="text-danger">
          - ERROR: {{ user.deleteError }}</span
        >
        <span v-else>
          - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span
        >
        <span
          ><b-button id="show-btn" @click="$bvModal.show('bv-modal-example')"
            >Modify</b-button
          >

          <b-modal id="bv-modal-example" hide-footer>
            <template #modal-title>
              Update Employee
            </template>
            <div>
              <h3>Hello From This Modal!</h3>
            </div>
            <b-button
              class="mt-3"
              block
              @click="
                updateUser({ id: user.id, user: user }),
                  $bvModal.hide('bv-modal-example')
              "
              >Modify</b-button
            >
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide('bv-modal-example')"
              >Close Me</b-button
            >
          </b-modal></span
        >
      </li>
    </ul>

    <p>
      <router-link to="/login">Logout</router-link>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
    }),
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
      updateUser: "update",
    }),
  },
};
</script>
