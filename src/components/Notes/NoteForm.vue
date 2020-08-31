<template>
  <div>
    <div v-html="headerInfo"></div>
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
      <div>Notes per page: {{ notesPerPage }}</div>
      <button @click="incNotesPerPage">INC</button>
      <button @click="decNotesPerPage">DEC</button>
    </div>    
    <div>DYNAMIC INPUT: 
      <component 
        :is="noteInputType" 
        type="text"
        :state="note.state">
      </component>
    </div>
    <div>
      <button @click.prevent="save">Save</button>
    </div>
  </div>
</template>
<script>
import NoteModel from "./NoteModel";

export default {
  name: "NoteForm",
  data() {
    return {
      //title: "",
      //text: "",
      //author: "",
      noteInputType: "input",
      notesPerPage: 10,
      headerInfo: "<b>This is the header HTML</b>",
      note: new NoteModel()
    };
  },
  props: {
    saveNote: {
      type: Function
    }
  },
  methods: {
    save: function() {
      this.saveNote(this.note);
    },
    incNotesPerPage: function () {
      this.notesPerPage++;
      if (this.noteInputType === "input") {
        this.noteInputType = "textarea";
      } else {
        this.noteInputType = "input";
      }
    },
    decNotesPerPage: function () {
      this.notesPerPage--;
    }

  }
};
</script>
<style>
.title {
  color: cornflowerblue;
}
</style>
