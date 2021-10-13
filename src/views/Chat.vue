<template>
  <div class="page-container">
    <div class="md-layout-item">
      <!-- Change room select -->
      <md-field>
        <label for="room">Room</label>
        <md-select v-model="room" @md-selected="onChangeRoom" name="room" id="room">
          <md-option v-for="room in this.$store.state.rooms" :key="room.id" :value="room.name">{{
            room.name
          }}</md-option>
        </md-select>
      </md-field>
    </div>

    <md-app md-waterfall md-mode="fixed">
      <!-- Room title and logout -->
      <md-app-toolbar class="md-primary">
        <span class="md-title page-container__room">{{ room }}</span>
        <md-button class="md-icon-button page-container-logout" @click.native="logout()">
          <md-icon>power_settings_new</md-icon>
        </md-button>
      </md-app-toolbar>

      <!-- Connected users list -->
      <md-app-drawer md-permanent="full">
        <!-- Display the users and emit an event when the user open a private chat -->
        <UserList
          :users="users"
          :openPrivateChat="openPrivateChat.chat"
          @open-chat="openChat($event)"
        ></UserList>
      </md-app-drawer>

      <!-- Chat area with all the messages -->
      <md-app-content>
        <!-- As an input it display the messages received from the server -->
        <ChatArea :messages="messages"></ChatArea>
      </md-app-content>
    </md-app>

    <!-- Text area to write on. It emits an event each time the user sends a message -->
    <MessageArea @send-message="sendMessage($event)"> </MessageArea>

    <!-- Private chat. The showDialog input controls whether we open a private chat or not -->
    <!-- The openPrivateChat is an object defined in the Vue chat component that contains
         information to handle the private chat -->
    <ChatDialog :showDialog="openPrivateChat" @close-chat="closePrivateChat()"> </ChatDialog>
  </div>
</template>
