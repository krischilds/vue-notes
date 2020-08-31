class NoteModel {
    constructor() {
        this.id;
        this.text = "";
        this.title = "";
        this.dateModified = "";
        this.dateCreated = "";
        this.author = "";
        this.state = ""; // creating, viewing, editing, saving
    }
}

export default NoteModel;
