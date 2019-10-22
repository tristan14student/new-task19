import React from 'react';
// this is where we create the component
class Tracks extends React.Component{
    constructor(){
        super()
        this.state ={
            info: [],
            musicValue: ''
        }
    }
    // this function will be used to fetch the information
    newSearch(){
        fetch('/music')
            .then(res => res.json())
            .then(info => this.setState({info}))
    }
    // this function will be used to fetch the data from the api
    musicSearch = async () => {
        let search = this.state.musicValue.split(' ').join('+')
        const getMusic = await fetch(`/music?search=${search}&type=${this.state.type}`)
        let res = await getMusic.json()
        this.setState({
            info: res
        })
    }
    // this is where we will get the information to display on the favourites page
    favoriteMusic= (i) => {
        let favPic = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            sample: i.previewUrl
        }
        // this will fetch the favourited information
        fetch('/musiclike', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(favPic)
        })
        // an alert to show that the song has been added
        alert('this song has been added to your favourites')
        
    }
    render(){
        return (
           <div>
               
            
            <div>
            <section className="header">
            <div class="searchBox">

            <input onChange={(e) => this.setState({musicValue: e.target.value})} class="searchInput"type="text" name="" placeholder="Search"/>
            <button class="searchButton" onClick={() => this.musicSearch()}>
            <i class="material-icons">
                music 
            </i>
            </button>
            </div>
            </section>
                
           
                    {/* this will display the results in a card */}
                    <div className="newCard" >
                        {/* the data will be mapped and then it will display in the layout down below */}
                    {this.state.info.map(sort_info => 
                    
                    
                    <div className="col-md-4 product-grid">
                    <div className="image">
                        
                            {/* the image is diplayed here */}
                        <img src={sort_info.artworkUrl100} className="img-fluid img-thumbnail" alt="001"/>
                            <div className="overlay">
                                <div className="detail">View Details</div>
                            </div>
                        
                    </div>
                    {/* the artist name */}
                    <h5 className="text-center">{sort_info.artistName}</h5>
                    {/* the song name */}
                    <p>{sort_info.trackName}</p>
                    {/* where the song wll play */}
                    <audio controls><source src={sort_info.previewUrl}type='audio/mpeg'></source></audio>
                    {/* the favourite button */}
                    <button onClick={() =>this.favoriteMusic(sort_info)} className="faveButton">Favorite</button>
                </div>
                )}
            </div>
            </div>
            </div>  
            
        ) 
    }
   
   
}
// exporting the module
export default Tracks