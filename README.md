# Personal Library API
## Stack
* Node.js
* Express.js
* MongoDB
* JQuery
* Chai
* Helmet
## Live
https://personal-library-.glitch.me/
## User stories
1) Nothing from my website will be cached in my client as a security measure.
2) I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.
3) I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
4) I can get /api/books to retrieve an aray of all books containing title, _id, & commentcount.
5) I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).
6) I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.
7) I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
8) If I try to request a book that doesn't exist I will get a 'no book exists' message.
9) I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
10) If a book has one comment `1 comment` is displayed.
11) If he has more, the number of comments followed by `comments` is displayed.
12) Clicking on the number of comments displays them.
13) I can add books, delete books and add comment from the front-end.

## My code with comments
https://github.com/SofianeDjellouli/Personnal-Library-API/blob/master/server.js  
https://github.com/SofianeDjellouli/Personnal-Library-API/blob/master/routes/api.js  
https://github.com/SofianeDjellouli/Personnal-Library/blob/master/public/react-component.js

