document.addEventListener('DOMContentLoaded', function () {
    var addNoteButton = document.getElementById('addNoteButton');
    var newNoteInput = document.getElementById('newNoteInput');

    addNoteButton.addEventListener('click', function() {
        var newNote = newNoteInput.value;
        if (newNote) {
            // Save to chrome.storage
            chrome.storage.local.get({notes: []}, function(data) {
                var notes = data.notes;
                notes.push(newNote);
                chrome.storage.local.set({notes: notes}, function() {
                    newNoteInput.value = '';
                    displayNotes();
                });
            });
        }
    });

    newNoteInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            var newNote = newNoteInput.value;
            if (newNote) {
                // Save to chrome.storage
                chrome.storage.local.get({notes: []}, function(data) {
                    var notes = data.notes;
                    notes.push(newNote);
                    chrome.storage.local.set({notes: notes}, function() {
                        newNoteInput.value = '';
                        displayNotes();
                    });
                });
            }
        }
    });

    displayNotes();
});

  
  function displayNotes() {
    var noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    chrome.storage.local.get({notes: []}, function(data) {
      var notes = data.notes;
      for (var i = 0; i < notes.length; i++) {
        var noteElement = document.createElement('p');
        noteElement.textContent = notes[i];
        noteElement.classList.add('note-text');
  
        var deleteButton = document.createElement('img');
        deleteButton.src = 'Trashcan.png';  // Replace with the path to your trash can icon
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (function(index) {
          return function() {
            deleteNote(index);
          }
        })(i));
  
        var noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
        noteContainer.appendChild(noteElement);
        noteContainer.appendChild(deleteButton);
  
        noteList.appendChild(noteContainer);
      }
    });
  }
  
  function deleteNote(index) {
    chrome.storage.local.get({notes: []}, function(data) {
      var notes = data.notes;
      notes.splice(index, 1);
      chrome.storage.local.set({notes: notes}, displayNotes);
    });
  }
  