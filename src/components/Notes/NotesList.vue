<template>
  <div>
    <h4>Notes List</h4>

    <div v-if="notes && notes.length">
      <ul>
        <li v-for="note in sortedArray" :key="note.id">
          <Note :note="note" :deleteNote="deleteNote" />
        </li>
      </ul>
    </div>
    <div v-else>No notes exist.</div>
  </div>
</template>

<script>
import Note from "./Note";

export default {
  name: "NotesList",
  props: {
    msg: String,
    notes: Array,
    deleteNote: Function
  },
  data() {
    return {
      selectedNote: undefined
    };
  },
  components: {
    Note
  },
  created() {
    // this.loadNotes();
  },
  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      }

      if (this.notes) {

          let noteSorted = [...this.notes];
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
