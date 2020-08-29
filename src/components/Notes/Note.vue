<template>
  <div class="note">
    <div class="note-title">{{ note.title }}</div>
    <div class="note-text">{{ note.text }}</div>
    <button>Edit</button>
    <button @click="deleteNote(note.id)">Delete</button>
  </div>
</template>
<script>
//import NoteModel from "./NoteModel";

export default {
  name: "Note",
  props: {
    note: Object,
    deleteNote: {
      type: Function
    }
  }
};
</script>
<style scoped>
.note {
  border: 2px solid rgba(77, 175, 225, 0.5);
  background: rgba(77, 175, 225, 0.2);
  color: rgb(0, 119, 179);
  margin: 1px;
  padding: 4px;
  padding-left: 10px;
  border-radius: 4px;
}
.note-title {
  font-weight: bold;
  text-align: left;
}
.note-text {
  text-align: left;
}
</style>
