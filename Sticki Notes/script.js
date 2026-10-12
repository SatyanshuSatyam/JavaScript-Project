function addNote() {
    const title = document.getElementById("note-title").value;
    const content = document.getElementById("note-content").value;
    if (title.trim() === "" && content.trim() === "") {
        alert("Please enter a title or content");
        return;
    }
    const notesList = document.getElementById("notes-list");
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `<h3>${title}</h3><p>${content}</p><button class='delete-btn' onclick='deleteNote(this)'>X</button>`;
    notesList.appendChild(note);
    document.getElementById("note-title").value = "";
    document.getElementById("note-content").value = "";
}
function deleteNote(element) {
    element.parentElement.remove();
}