let tableBody = document.getElementById('tableBody');
tableBody.innerHTML = localStorage.getItem('tableBody');

function Book(bookName, bookAuthor, bookType) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.bookType = bookType;
    console.log("Book formed is ", this);
}

function Display() {

}

let bookCounterx = localStorage.getItem('bookCounter');
let bookCounter;
if (!bookCounterx) {
    bookCounter = 1;
} else {
    bookCounter = parseInt(bookCounterx);
}
/* 
NOTE all these rows are direct children of tableBody 

 */
Display.prototype.addBook = function (newBook) {
    let thisId = 'delete' + bookCounter;
    let dthisId = 'd' + thisId;
    let stringUI = `<tr id = "${dthisId}" class="rowwise">
                        <th scope="row">${bookCounter++}</th>
                        <td>${newBook.bookName}</td>
                        <td>${newBook.bookAuthor}</td>
                        <td>${newBook.bookType}</td>        
                        <td> <button id="${thisId}" class="goDelete">Delete</button> </td>                
                    </tr>`;
    localStorage.setItem('bookCounter', `${bookCounter}`);
    let whereTo = document.getElementById('tableBody');
    whereTo.innerHTML += stringUI;
    localStorage.setItem('tableBody', whereTo.innerHTML);
};


/* 
TODO 
jb delete pe click ho 
i. iske parent ke parent ki row delete ho jaaye 
ii.baki rows ki numbreing a/c set ho jaaye 
iii. phir usko lS me update kr do 
iv. also update bookCounter ie (bookCounter--)
*/
document.querySelectorAll('.goDelete').forEach(item => {
    item.addEventListener('click', event => {
        let dad = item.parentElement.parentElement;
        let allRows = tableBody.children;
        let newHTML = '', ct = 1;
        let rowsContainer = [];

        console.log("here");
        for (let i = 0; i < allRows.length; ++i) {
            if (allRows[i] != dad) {
                allRows[i].children[0].innerHTML = `${ct}`;
                ++ct;
                // console.log(allRows[i]);
                rowsContainer.push(allRows[i]);
                // newHTML += allRows[i];
            }
        }
        // console.log(typeof rowsContainer[0]);

        for (let i = 0; i < rowsContainer.length; ++i) {
            // newHTML += JSON.stringify(rowsContainer[i]);
            newHTML += String(rowsContainer[i]);
        }
        console.log("newHTML = ", newHTML);

        // tableBody.innerHTML = newHTML;
    });
});


Display.prototype.clear = function () {
    let formID = document.getElementById('myFormId');
    formID.reset();
}


/*
TODO add alert which diminishes after 2sec 
*/
Display.prototype.showAlert = function (type, msgContent) {
    let newAlert = `
    <div class="alert alert-${type} alert-dismissible fade showAlert" role="alert">
    <p> Message : ${msgContent} </p> <br> 
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>`;
    let tableBody = document.getElementById('alerts');
    let earlier = tableBody.innerHTML;
    tableBody.innerHTML += newAlert;
    setTimeout(function () {
        tableBody.innerHTML = earlier;
    }, 2000);
}


Display.prototype.validate = function (myBook) {
    if (myBook.bookName.length < 2 || myBook.bookAuthor.length < 2) {
        return false;
    } else {
        return true;
    }
}


let formSubmit = document.getElementById('myFormId');
formSubmit.addEventListener('submit', formSubmitted);
function formSubmitted(e) {
    e.preventDefault();
    let bookName = document.getElementById('bookName').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookType;
    let type1 = document.getElementById('Education');
    let type2 = document.getElementById('Programming');
    let type3 = document.getElementById('Entertainment');
    if (type1.checked) {
        bookType = type1.value;
    } else if (type2.checked) {
        bookType = type2.value;
    } else {
        bookType = type3.value;
    }
    let newBook = new Book(bookName, bookAuthor, bookType);
    let display = new Display();
    if (display.validate(newBook)) {
        display.showAlert('success', 'Gambare Gambare senpai, it got submitted successfully');
        display.addBook(newBook);
        display.clear();
    } else {
        display.showAlert('warning', 'Invalid entry');
    }
};

let searchID = document.getElementById('searchId');
console.log(searchID);
searchID.addEventListener('keyup', function () {
    let what = searchID.value;
    let allRows = document.getElementsByClassName('rowwise');
    for (let i = 0; i < 4; ++i) {
        if (allRows[i].innerHTML.includes(what)) {
            // console.log("hai", i);

        } else {
            allRows[i].style.display = 'none';
        }
    }

})
searchID.addEventListener('blur', function () {
    let allRows = document.getElementsByClassName('rowwise');
    for (let i = 0; i < 4; ++i) {
        allRows[i].style.display = 'inline-block';
    }
});
