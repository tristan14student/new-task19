import React from 'react';


//this is a class component
class iBooks extends React.Component{
    constructor(){
        super()
        this.state ={
            info: [],  
            bookValue: ''
        }
    }
    // this function will be used to fetch the information
    newSearch(){
        fetch('/books')
            .then(res => res.json())
            .then(info => this.setState({info}))
    }
    // this function will be used to fetch the data from the api
    bookSearch = async () => {
        let search = this.state.bookValue.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        let res = await getBook.json()
        this.setState({
            info: res
        })
    }
    // this is where we will get the information to display on the favourites page
    favoriteBook= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            description: i.description
        }
        // this will fetch the favourited information
        fetch('/favoritesBooks', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        // an alert to show that the song has been added
        alert('the book was added to your favourites')
    }
   
    render(){
        return (
            <div>
             <div>
             <section className="header">
             <div class="searchBox">

             <input onChange={(e) => this.setState({bookValue: e.target.value})}class="searchInput"type="text" name="" placeholder="Search"/>
             <button class="searchButton" onClick={() => this.bookSearch()}>
             <i class="material-icons">search Books</i>
            </button>
            </div>
            </section>
                {/* this will display the results in a card */}
            
                <div className="newCard" >
                {this.state.info.map(sort_info => 
                
                <div className="col-md-4 product-grid">
                <div className="image">
                 
                <img src={sort_info.artworkUrl100} className="img-fluid img-thumbnail" alt="002"/>
                <div className="overlay">
                <div className="detail">View Details</div>
                </div>
                
                </div>
                <h5 className="text-center">{sort_info.artistName}</h5>
                <p>{sort_info.description}</p>

                <button onClick={() => {this.favoriteBook(sort_info)}}>Favorite</button>
                </div>
            )} </div>
</div>
</div>  ) 
}}


            

export default iBooks