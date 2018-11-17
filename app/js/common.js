var todoApp = {
    notes: [],
    messages: {
        allAmount: '0',
        completedAmount: '0',
        condition: 'All okay )',
    },
    presentCategory: 'show-uncompleted',
    category: function() {
        if(this.presentCategory == 'show-completed') {
            this.showCompleted();
            this.messagesView();
        }else if(this.presentCategory == 'show-uncompleted') {
            //categories[1].setAttribute('class', 'active');
            this.showUncompleted();
            this.messagesView();
        }else if(this.presentCategory == 'show-all') {
            //categories[2].setAttribute('class', 'active');
             this.showAll();
             this.messagesView();
         }
    },
    validation: function(nameTask) {
        this.messages.condition = '';
        if(nameTask.length < 1) {
            this.messages.condition = 'You need to fill input';
        }
        this.notes.forEach(function(item) {
            if(item.text.toLowerCase() == nameTask.toLowerCase()) {
                todoApp.messages.condition = 'You already have this note';
                
            }
            
        })
    },
    addNote: function(nameTask) {
        this.validation(nameTask);
        this.messagesView();
        if(this.messages.condition.length == 0){
            
            this.notes.push({text: nameTask, completed: false, id: this.notes.length });
            this.messages.allAmount = this.notes.length;
            this.messages.condition = 'All okay )';
            this.messagesView();

        }
        
        this.category();
        this.messagesView();
        
    },
    creatingElements: function(item) {
        var div = document.createElement('div');
        var pText = document.createElement('p'); 
        var completeButton = document.createElement('button');
        var removeButton = document.createElement('button');

        pText.innerHTML = item.text;
        completeButton.innerHTML = 'to complete';
        removeButton.innerHTML = 'to remove';

        pText.setAttribute('class', 'note-text');
        completeButton.setAttribute('class', 'to-complete');
        completeButton.setAttribute('id', `${item.id}`);
        removeButton.setAttribute('id', `${item.id}`);
        removeButton.setAttribute('class', 'to-remove');

        div.setAttribute('class', 'note');

        this.addListeners(completeButton, removeButton);

        if(item.completed) {
            div.appendChild(pText);
            div.appendChild(removeButton);
        }else {
            div.appendChild(pText);
            div.appendChild(removeButton);
            div.appendChild(completeButton);
        }

        document.querySelector('#notes').appendChild(div); 

    },

    addListeners: function(completeButton, removeButton) {
        completeButton.addEventListener('click', function(e) {
            todoApp.complete(e.currentTarget.id)
            c(e.currentTarget.id)
         })
        removeButton.addEventListener('click', function(e) {
             todoApp.removeNote(e.currentTarget.id)
          })

    }, 
    complete: function(value) {
        this.notes.forEach(function(item) {
            if(item.id == value) {
                item.completed = true;    
            }
        })
        var completed = this.notes.filter(function (note) {
            return note.completed;
        })
        this.messages.completedAmount = completed.length;
        this.category();
        this.messagesView();
    }, 
    messagesView: function() {
        var completedTodosTitle = document.querySelector('#completed-notes');
        var allNotes = document.querySelector('#all-notes');
        var conditions = document.querySelector('#conditions');
        if(this.messages.condition == 'All okay )') {
            conditions.innerHTML = this.messages.condition;
            conditions.setAttribute('class', 'okay');
        }else {
            conditions.innerHTML = this.messages.condition;
            conditions.setAttribute('class', 'error');
        }
        completedTodosTitle.innerHTML = 'You have completed notes: ' + this.messages.completedAmount;
        
        if(this.messages.allAmount > 1) {
            allNotes.innerHTML = `You have ${this.messages.allAmount} notes`;
        }else {
            allNotes.innerHTML = `You have ${this.messages.allAmount} note`;
        }

    },
    removeNote: function(value){
        for(var i = 0; i<this.notes.length; i++) {
            if(this.notes[i].id == value) {
                this.notes.splice(i, 1);
                this.messages.allAmount -= 1;
                if(this.presentCategory == 'show-completed') {
                    this.messages.completedAmount -= 1
                }
            }
        }
        this.category();
        this.messagesView();
    },
    show: function(whatShow) {
        this.clearList();
        whatShow.forEach(function(item) {
            todoApp.creatingElements(item);
        })
        
    },
    clearList: function() {
        document.querySelectorAll('.note').forEach(function(item) {
            item.remove(); 
        })
    },
    filtering: function(request) {
        this.clearList();
        var filteredNotes = this.notes.filter(function (note) {
            return note.text.toLowerCase().includes(request.toLowerCase())
        })
        this.show(filteredNotes, 'nope');
    },
    showCompleted: function() {
        var completedNotes = this.notes.filter(function(note) {
            return note.completed;
        })
        this.show(completedNotes);
    },
    showAll: function() {
        this.show(this.notes);
    },
    showUncompleted: function() {
        var uncompletedNotes = this.notes.filter(function(note) {
            return !note.completed;
        })
        this.show(uncompletedNotes);
    }
}





document.querySelector('#filters').addEventListener('click', function(e) {
    todoApp.presentCategory = e.target.id;
    todoApp.category();
})

document.querySelector("#name-form").addEventListener('submit', function(e) {
    e.preventDefault();
    todoApp.addNote(e.target.elements.firstName.value);
    e.target.elements.firstName.value = '';
})
document.querySelector('#search-text').addEventListener('input', function(e) {
    todoApp.filtering(e.target.value);   
})

function c(arg) {
    console.log(arg);
}