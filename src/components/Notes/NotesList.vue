<template>
  <div>
    <h4>Notes List</h4>
    <h5>PAGE STATE : {{ pageState }}</h5>
    <div style="display:flex">
      <div v-if="notes && notes.length">
        <ul>
          <li v-for="note in sortedNotes" :key="note.id">
            <Note
              :note="note"
              :saveNote="saveNote"
              :deleteNote="deleteNote"
              :discardNote="discardNote"
            />
          </li>
        </ul>
      </div>
      <div v-else>No notes found</div>
      <div v-if="pageState === 'create'" style="background:lightyellow">
        <div id="note-preview-pane">
          Show Preview Pane Here
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Note from "./Note";

export default {
  name: "NotesList",
  props: {
    msg: String,
    notes: Array,
    deleteNote: Function,
    discardNote: Function,
    saveNote: Function
  },
  data() {
    return {
      selectedNote: undefined,
      githubUrl: "https://github.com/krischilds/vue-notes"
    };
  },
  components: {
    Note
  },
  created() {
    // this.loadNotes();
  },
  computed: {
    pageState: function () {
      let state = "view";
      if (this.notes) {
        let creatingNotes = this.notes.filter(note=> {
          return note.state === 'creating'
        });

        if (creatingNotes.length > 0) {
          state = "create"; 
        } else {
          state = "view";
        }
      }
      return state;
    },
    sortedNotes: function() {
      function compare(a, b) {
        let aDate;
        let bDate;
 
        if (!a.dateCreated || !b.dateCreated) {
          return 1;
        }

        try {
          aDate = new Date(a.dateCreated);
          bDate = new Date(b.dateCreated);
        } catch(err) {
          console.error(err);
          return 0;
        }  
        // console.log(aDate,bDate);
        return bDate - aDate;
      }
      console.log("noteSorted called at " + (new Date()).toISOString()  );
      if (this.notes) {
          let noteSorted = [...this.notes];

          // (this.pageState !== 'view') ? noteSorted : noteSorted.sort(compare);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return noteSorted.sort(compare);
      } else {
        return [];
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-items: flex-start;
  flex-direction: column;
  max-width: 300px;
}

li {
  margin: 2px;
}
</style>
