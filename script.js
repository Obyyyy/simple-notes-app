const addButton = document.getElementById("add-note");
const main = document.getElementById("main");

addButton.addEventListener("click", addNote);

function addNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="head">
        <i class="save-btn fa-solid fa-save"></i>
        <i class="delete-btn fa-solid fa-trash"></i>
    </div>
    <div class="body">
        <textarea></textarea>
    </div>
    `;

    const saveBtn = note.querySelector(".save-btn");
    const deleteBtn = note.querySelector(".delete-btn");
    const textarea = note.querySelector("textarea");

    saveBtn.addEventListener("click", saveNotes);
    textarea.addEventListener("input", saveNotes);
    deleteBtn.addEventListener("click", () => {
        note.remove();
        saveNotes();
    });

    main.appendChild(note);
}

function saveNotes() {
    const notes = document.querySelectorAll(".note textarea");
    let data = Array.from(notes).map((note) => note.value);
    // console.log(notes, data);

    if (data.length === 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
}

function getNotes() {
    const listNotes = JSON.parse(localStorage.getItem("notes"));

    if (listNotes !== null) {
        listNotes.forEach((noteText) => {
            addNote();

            const notes = document.querySelectorAll(".note textarea");
            let note = notes[notes.length - 1];
            note.value = noteText;
        });
    } else {
        addNote();
    }
}

getNotes();
