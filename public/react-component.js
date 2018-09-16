class PersonalLibrary extends React.Component {
  
  state = {
    input: '',
    booklist: [],
    loading:true,
    showComments:{}
  }    
  
      
  handleChange = event => {
    this.setState({ input: event.target.value });
  }
  
  submitBook = (event) => {
    event.preventDefault();
    event.target.reset()
    const title = this.state.input
    axios.post('https://personal-library-.glitch.me/api/books', {title})
      .then(res => {
        this.setState({booklist:[res.data,...this.state.booklist]})
      })
      .catch(err=> console.log(err))
  }
  
  submitComment = (event,id,i) => {
    event.preventDefault();
    event.target.reset()
    const comment = this.state.input
    axios.post('https://personal-library-.glitch.me/api/books/'+id, {comment})
      .then(res => {
        let change=this.state.booklist
        change.splice(i,1,res.data)
        this.setState({booklist:change})
      })
      .catch(err=> console.log(err))
  }
  
  deleteItem= (item)=>{
    axios.delete('https://personal-library-.glitch.me/api/books/'+item)
      .then(res => {
        item!==''?
          this.setState({booklist:this.state.booklist.filter(e=>e._id!==item)})
          : this.setState({booklist:[]})
      })
      .catch(err=> console.log(err))
    this.state.booklist.length===0 ? this.setState({loading:false}) : null
  }
  
  showComments(i){
    let toggle=this.state.showComments
    this.state.showComments[i] ? toggle[i]=!this.state.showComments[i] : toggle[i]=true 
    this.setState({showComments:toggle})
  }
  
  componentDidMount(){
    axios.get('https://personal-library-.glitch.me/api/books')
      .then(res => {
        this.setState({booklist:res.data.reverse()})
        this.state.booklist.map((e,i)=>{
          axios.get('https://personal-library-.glitch.me/api/books/'+e._id)
            .then(res=>{
              let change=this.state.booklist
              change.splice(i,1,res.data[0])
              this.setState({booklist:change,loading:false})
            })
            .catch(err=>console.log(err))
        })
      })
      .catch(err=> console.log(err))
      // this.state.booklist.length===0 ? this.setState({loading:true}) : null
  }
  
  render(){
    const {booklist}=this.state
    return(      
      <div className="container">
        <h4 className="text-center my-4 display-4">My Personal Library</h4>
        <div className="containter bg-info rounded mb-3">
        <form onSubmit={this.submitBook} className="form-inline d-flex justify-content-center py-4">
          <label className="" forHtml="addbook">
            <h5>Add a book:     </h5>          
          </label>
            <input id="addbook" type="text" name="title" onChange={this.handleChange} className="form-control mx-3" placeholder="Some title..."/>
          <button type="submit" className="btn btn-primary">Sumbit</button>
        </form>
        <div>
          <div className="d-flex flex-wrap justify-content-center">
            {booklist.length>0 ? 
              booklist.map((e,i)=> <li key={i} className="card m-2 w-25">
                             <div className="card-body text-center d-flex flex-column justify-content-between">
                               <div>
                <h5 className="card-title">
                {e.title} 
                </h5>                
                <ul className="list-group list-group-flush">
                  {e.comments ? 
                  <div onClick={()=>this.showComments(i)}>
                    {e.comments.length===0? "" : e.comments.length===1 ? e.comments.length+" comment":e.comments.length+" comments"} 
                  </div> : null}
                  {this.state.showComments[i]  ? 
                  e.comments.map((comment,j)=><li key={j} className="list-group-item">{comment}</li>) : null}
                </ul>
                               
                <form onSubmit={(event)=>this.submitComment(event,e._id,i)} className="form-group d-flex flex-column align-items-center mt-3">
                <label htmlFor={e._id} className="mb-0">Add a comment: </label>
                <input type="text" id={e._id} onChange={this.handleChange} className="form-control my-2"/>
                <button type="submit" className="btn btn-success w-100">Send</button>
                </form>   
                                 </div>
                <button onClick={()=>this.deleteItem(e._id)} className="btn btn-secondary">
                  Delete Book
                </button>
                 </div>
              </li>)  
              : this.state.loading ? 
                           <div className="py-4">
                           Fetching data...
                           </div> : 
                           <div className="py-4">
                           Add a book first
                           </div>}
          </div>  
          {booklist.length>0? 
            <div className="d-flex justify-content-center py-4">
            <button onClick={()=>this.deleteItem('')} className="btn btn-warning">
              Delete all books
            </button>
            </div>
           :null} 
        </div>
      </div>
      </div>
    )
  }
}


ReactDOM.render(<JSCalculator/>,document.getElementById('app'))
