<template>
  <div>
    <div>Add Note</div>
    <div>
      <input type="text" name="noteTitle" v-model="note.title" />
    </div>
    <div>
      <textarea name="noteText" v-model="note.text" />
    </div>
    <div>
      <input type="text" name="noteAuthor" v-model="note.author" />
    </div>
    <div>
      <input type="date" name="dateCreated" v-model="note.dateCreated" />
    </div>
    <div>
      <button @click.prevent="saveNote">Save</button>
    </div>
  </div>
</template>
<script>
import NoteModel from "./NoteModel";

export default {
  name: "NewNote",
  data() {
    return {
      //title: "",
      //text: "",
      //author: "",

      note: new NoteModel()
    };
  },
  props: {
    createNote: {
      type: Function
    }
  },
  methods: {
    saveNote: function() {
      this.createNote(this.note);
    }
  }
};
</script>
<style>
.title {
  color: cornflowerblue;
}
</style>
