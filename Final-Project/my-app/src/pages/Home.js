import React, {Component} from "react"
import axios from "axios"
import { Carousel,Card,Modal } from 'antd';
import "./Games.css"

const detailGame = (id) => {
  
  let idGame = parseInt(id)
 
   axios.get(`https://backendexample.sanbersy.com/api/data-game/${idGame}`)
    .then(res => {
        let secondsToGo = 5;
        const modal = Modal.success({
          title: 'Detail Game',
          content: ``,
        });
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `
                      Genre : ${res.data.genre}
                      Single Player : ${res.data.singlePlayer}
                      Multi Player : ${res.data.multiplayer}
                      Name : ${res.data.name}
                      Platform : ${res.data.platform}
                      Release : ${res.data.release}`
                      
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy();
        }, secondsToGo * 1000);
    })
}


const detailMovie = (id) => {
  let idMovie = parseInt(id)

   axios.get(`https://backendexample.sanbersy.com/api/data-movie/${idMovie}`)
    .then(res => {
       let secondsToGo = 5;
        const modal = Modal.success({
          title: 'Detail Movie',
          content: ``,
        });
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `
                      Title : ${res.data.title}
                      Description : ${res.data.description}
                      Duration: ${res.data.duration}
                      Genre : ${res.data.genre}
                      Rating : ${res.data.rating}
                      Review : ${res.data.review}
                      Year : ${res.data.year}`
                      
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy();
        }, secondsToGo * 1000);
        
    })
}

const contentStyle = {
  height: '300px',
  color: '#fff',
  width:'300px',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      games: [],
      movies:[]
    }
  }

  componentDidMount(){
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id, 
        genre: el.genre, 
        image_url: el.image_url,
        singlePlayer: el.singlePlayer,
        multiplayer: el.multiplayer,
        name: el.name,
        platform: el.platform,
        release: el.release
      }})
      this.setState({games})
    })
     axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id, 
        description: el.description, 
        duration: el.duration,
        genre: el.genre,
        image_url: el.image_url,
        rating: el.rating,
        review: el.review,
        title: el.title,
        year: el.year

      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
     
        <div className="row">
        <div className="column">
          <Carousel>
             { this.state.games.map((item,index)=>{
                return (
                         <Card title="Daftar Games Pilihan" extra={<a href="#">More</a>} style={{ width: 300 }}>
     
   
                          
                             <h3 style={contentStyle}>
                    <div style={{width: "40vw", float: "left", display: "inline-block"}}>
                      <img style={{width: "100%", height: "70%", objectFit: "cover"}} src={item.image_url}
                         onClick={() => detailGame(item.id)}/>
                        
                    </div>
                    </h3>
                        </Card>
                )
                        
                
              })
               }
          </Carousel>
          </div>
           <div className="column">
           <Carousel>
             { this.state.movies.map((item,index)=>{
                return (
                         <Card title="Daftar Movie Pilihan"  style={{ width: 300 }}>
     
   
                          
                             <h3 style={contentStyle}>
                    <div style={{width: "40vw", float: "left", display: "inline-block"}}>
                      <img style={{width: "100%", height: "70%", objectFit: "cover"}} src={item.image_url}
                      onClick={() => detailMovie(item.id)}
                       />
                     
                    </div>
                    </h3>
                        </Card>
                )
                        
                
              })
               }
          </Carousel>
       </div>
        </div>

      </>
    )
  }
}

export default Home