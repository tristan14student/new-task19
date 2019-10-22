import React from 'react';

//this is a class component
class userFavorite extends React.Component {
    constructor(){
        super()
        this.state = {
            likemusic: [],
            favebook: [],
            
        }
    }
// this is where we will get the favourites information that we will display on the page
    componentDidMount(){
        // the music
        fetch('/musiclike')
            .then(res => res.json())
            .then(music => this.setState({likemusic: music}))
        // the books
            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({favebook: books}))

            
    }
// this is a function to remove a song
    songRemove = (i) => {
        let songDeleteFromFav = {
            deleted: i.id
        }
        // this will show the updated favourites
        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songDeleteFromFav)
        })
        // this will reload the page once something has been deleted
        document.location.reload()
    }
        // this will remove a book from the favourites
    bookRemove = (i) => {
        let bookRemovedFromFav = {
            deleted: i.id
        }
        // this will fetch the updated json file
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRemovedFromFav)
        })
        document.location.reload()
    }
    render(){
        // where all the data will be rendered
        return(
            <div>
               <fieldset>
           
                   {this.state.likemusic.map(likeM => <article key={likeM.trackId}> <p>{likeM.artist}</p> <p>{likeM.trackId}</p>
                       <img src={likeM.artwork} alt='artwork'/><br/>
                       <audio controls><source src={likeM.sample}/></audio>
                       <p>{likeM.track}</p>
                   
                       <button onClick={() => {this.songRemove(likeM)}}>Remove</button>
                   </article>)}
               </fieldset>
               <fieldset>
          
                   {this.state.favebook.map(bookf => <article key={bookf.artwork}><p>{bookf.artist}</p>
                       <img src={bookf.artwork} alt='artwork'/><br/>
                       <p>{bookf.description}</p>
                       <p>{bookf.track}</p>
                       <button onClick={() => {this.bookRemove(bookf)}}>Remove</button>
                   </article>)}
               </fieldset>
           </div>
        )
    }
}

export default userFavorite