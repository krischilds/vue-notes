<template>
  <div class="note">
    <div v-if="note.state === 'creating'" :class="{'note-creating':note.state === 'creating'}">
      <div>
        <div>Title</div>
        <input ref="title" type="text" name="title" v-model="note.title" />
      </div>
      <div>
        <div>Text</div>
        <input type="text" name="text" v-model="note.text" />
      </div>
      <button @click="discardNote">Discard</button>
      <button @click="saveNote(note)">Save</button>
    </div>
    <div v-if="note.state !== 'creating'">
      <div class="note-title">{{ note.title }}</div>
      <div class="note-text">{{ note.text }}</div>
      <button>Edit</button>
      <button @click="deleteNote(note.id)">Delete</button>
    </div>
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
    },
    saveNote: { type: Function },
    discardNote: { type: Function }
  },
  created() {
    
    
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
.note-creating {
  background: lightgreen;
}
</style>
