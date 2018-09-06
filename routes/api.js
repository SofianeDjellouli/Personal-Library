'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;

module.exports = function (app) {
  MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {

    app.route('/api/books')
      .get(function (req, res){
        //response will be array of book objects without their comments 
      // but with the number of comments in the commentcount property
        db.collection('books').find().toArray((err,doc)=>{
          if (err) res.send(err)
          else {
            doc.forEach(e=>{
              e.commentcount=e.comments.length
              delete e.comments
            })
            res.json(doc)
          }
        })
    })
// we create books in the db with an array of comment 
//     but we remove it from the response
      .post(function (req, res){
        var title = req.body.title;
        db.collection('books').insertOne({title:title,comments:[]},(err,doc)=>{
          if (err) res.send(err)
          else {
            delete doc.ops[0].comments
            res.json(doc.ops[0])
          }
        })
      })

      .delete(function(req, res){
        //if successful response will be 'complete delete successful'
        db.collection('books').deleteMany({},(err,doc)=>{
          if (err) res.text(err)
          else res.send('complete delete successful')          
        })
      });


// searches for a book by its id
    app.route('/api/books/:id')
      .get(function (req, res){
        var bookid = req.params.id;
        db.collection('books').find({_id:ObjectId(bookid)}).toArray((err,doc)=>{
          if (err) res.send(err)
          else if (doc.length===0) res.send('no book exists')
          else res.json(doc)
        })
      })

//     adds a comment to a book and returns the new instance
      .post(function(req, res){
        var bookid = req.params.id;
        var comment = req.body.comment;
        db.collection('books')
          .findOneAndUpdate({_id:ObjectId(bookid)},
                            {$push:{comments:comment}},
                            {returnOriginal:false},
                                                (err,doc)=>{
          if (err) {
            res.send(err)
          } else {
            res.json(doc.value)
          }
        })
      
      })

//     deletes a book instance through jquery, not finished yet
      .delete(function(req, res){
        var bookid = req.params.id;
        //if successful response will be 'delete successful'
        db.collection('books').findOneAndDelete({_id:ObjectId(bookid)},
                                                (err,doc)=>{
          if (err) res.send(err)
          else res.send('delete successful')          
        })
      });
    });
};
