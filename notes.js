const fs = require('node:fs')
const chalk = require("chalk");

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
        console.log(chalk.bgGreen('New note added!'))
        saveNotes(notes)
    } else {
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter((note) => note.title !== title)

    if (notes.length === newNotes.length) {
        console.log(chalk.bgRed("No note found!"))
    } else {
        console.log(chalk.bgGreen(`Note with title '${title}' has been removed!`))
        saveNotes(newNotes)
    }

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.blueBright("Your notes:"))

    notes.forEach(
        (note, index) => console.log(
            `${chalk.blueBright(index+1)}- ${chalk.bold.bgCyan(note.title)}`
        )
    )
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote) {
        console.log(chalk.bgCyan(`Title: ${title}`))
        console.log(chalk.bgGray(`Body:\n${foundNote.body}`))
    } else {
        console.log(chalk.bgRed(`can not find a note with title '${title}' !`))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
