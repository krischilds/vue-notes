<template>
  <div>
    <header>{{ pageTitle }}</header>
    <div style="display:flex;justify-content:space-between">
      <button @click="quickAddNote">Quick Add Note</button>
      <button @click="showNote">{{ showNoteText }}</button>
    </div>
    <div v-if="showNoteForm">
      <note-form :saveNote="saveNote" />
    </div>
    <notes-list :notes="notes" :discardNote="discardNote" :deleteNote="deleteNote" :saveNote="saveNote"/>
  </div>
</template>

<script>
import NotesList from "../components/Notes/NotesList.vue";
import NoteForm from "../components/Notes/NoteForm.vue";
import NoteModel from "../components/Notes/NoteModel";

export default {
  name: "Notes",
  components: {
    NotesList,
    NoteForm
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
    quickAddNote: function() {
      console.log("Quick Add");
      let n = new NoteModel();
      // n.id = 0;
      n.state = "creating";
      
      if (this.notes && this.notes.length) {
        if (this.notes[0].state !== "creating")
        this.notes.unshift(n);
      }
    },
    discardNote: function () {
      this.notes = this.notes.slice(1);
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
    async saveNote(note) {
      /*
      const NoteForm = new NoteModel();
      NoteForm.title = title;
      NoteForm.text = text;
      NoteForm.author = author;
      NoteForm.dateCreated = dateCreated;
      NoteForm.dateModified = dateCreated;
      */

      const n2 = {...note};
      console.log(n2);
      n2.state = "viewing";
      n2.dateCreated = new Date();
      let body = JSON.stringify(n2);
      console.log("note",body);

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
