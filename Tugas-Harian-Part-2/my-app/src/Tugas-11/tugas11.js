import React, {Component} from 'react'

class Timer extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: 100,
      date : new Date()
    }
  }

  componentDidMount(){
    if (this.props.start !== undefined){
      this.setState({time: this.props.start})
    }
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick() {
   
      if(this.state.time>0)
      {
           this.setState({
      time: this.state.time - 1 
    });
      }

  }


  render(){
    if(this.state.time !== 0){
    return(
      <>
      
        <h1 style={{textAlign: "center"}}>
         sekarang jam :{this.state.date.toLocaleTimeString()} hitung mundur:{this.state.time}
        </h1>
      
        
        
      </>
)
      }else{
        return null
      }
    
  }
}

export default Timer