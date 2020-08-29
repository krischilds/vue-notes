<template>
  <div>
    <header>{{ pageTitle }}</header>
    <button @click="showNote">{{ showNoteText }}</button>
    <div v-if="showNoteForm">
      <new-note :createNote="createNote" />
    </div>
    <notes-list :notes="notes" :deleteNote="deleteNote" />
  </div>
</template>

<script>
import NotesList from "../components/Notes/NotesList.vue";
import NewNote from "../components/Notes/NewNote.vue";
//import NoteModel from "../components/Notes/NoteModel";

export default {
  name: "Notes",
  components: {
    NotesList,
    NewNote
  },
  data() {
    return {
      showNoteForm: false,
      notes: []
    };
  },
  methods: {
    showNote: function(event) {
      event.preventDefault();
      this.showNoteForm = !this.showNoteForm;
    },
    async loadNotes() {
      console.log("loadNotes");
      let response = await fetch("http://localhost:3000/notes");
      this.notes = await response.json();
      console.log(this.notes);
    },

    async deleteNote(id) {
      let res = await fetch("http://localhost:3000/notes/" + id, {
        method: "DELETE"
      }).catch(error => {
        console.error(error);
      });

      if (res.ok) {
        let resJson = await res.json();
        console.log(resJson);
        this.loadNotes();
      }
    },
    async createNote(note) {
      /*
      const newNote = new NoteModel();
      newNote.title = title;
      newNote.text = text;
      newNote.author = author;
      newNote.dateCreated = dateCreated;
      newNote.dateModified = dateCreated;
      */

      // title, text, author, dateCreated
      // : encodeURI(text)
/*
      const n2 = {
        title,
        text,
        author,
        dateCreated
      };
*/
      const n2 = {...note};
      console.log(n2);

      let body = JSON.stringify(n2);
      console.log("createNote POST BODY");

      let res = await fetch("http://localhost:3000/notes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body
      }).catch(err => {
        console.error(err);
      });

      if (res.ok) {
        let resJson = await res.json();
        console.log(resJson);
        this.loadNotes();
      }
    }
  },
  computed: {
    pageTitle: {
      get() {
        // let val = new Date().toTimeString();
        // return `Notes for ${val}`
        let v = this.notes.length;
        return `Number of notes: ${v}`;
      }
    },
    showNoteText() {
      return this.showNoteForm ? "Hide Form" : "Show Form";
    }
  },
  created() {
    this.loadNotes();
  }
};
</script>
