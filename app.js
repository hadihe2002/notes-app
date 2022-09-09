const notes = require("./notes.js")
const chalk = require("chalk")
const yargs = require("yargs")


// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: "Note description",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    },

})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title : {
            describe: 'Note title',
            type: 'string',
            demandOption: true,
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    },
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        notes.listNotes()
    },
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder : {
      title: {
          describe: 'Read a note',
          demandOption: true,
          type : 'string',
      }
    },
    handler(argv) {
        notes.readNote(argv.title)
    },

})

yargs.parse()
//console.log(yargs.argv)
