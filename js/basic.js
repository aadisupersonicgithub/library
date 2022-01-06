
class Library {
    // 1 booklist banao this.bookList = [] , aur ek map book_owner let it map(object).. 1 function for this to get this 
    // issueBOok me remove from booklist, chahe to save bhi krlo kisko issue kia (as map etc me)
    // returnBook : wapas booklist me daal do 
    // dont bother time complexity just implement logic

    constructor(bookList) {
        // see how to create array in js (as we thinking in c++)
        this.bookList = bookList;
        this.book_owner = {};
    }
    issueBook(bookName, owner) {
        let idx = this.bookList.indexOf(bookName);
        // if (this.bookList.includes(bookName)) {
        if (idx > -1) {
            // this.book_owner.bookName = owner; ERROR 
            this.book_owner[`${bookName}`] = owner;

            this.bookList.splice(idx, 1);
            console.log(`Assigned ${bookName} to ${owner}`);
        } else {
            console.log(`Failed to issue book due to unavailability`);
        }
        console.log(this.book_owner);
    }
    returnBook(bookName) {
        this.bookList.push(bookName);
        console.log(`Book has been successfully returned`);
        delete this.book_owner[`${bookName}`];
        console.log(" here ", this.book_owner);

        // TOPIC 
        // searching a key in object 
        // obj.hasOwnProperty('key')

        // deleting a key from object 
        // var key = "cow"
        // m1. delete obj[key]
        // m2. delete obj['cow']
        // m3 delete obj.cow 

    }

}
const lib = new Library(['book1', 'book2', 'book3']);
console.log(lib.bookList, lib.book_owner);
const p2 = 'p2';
lib.issueBook('book1', 'p1');
lib.issueBook('book2', p2);
// fail dikhayega 
lib.issueBook('book1', p2);
// now free book1 and reassign 
lib.returnBook('book1');
lib.issueBook('book1', p2)