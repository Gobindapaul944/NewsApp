import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps={
    country: 'in',
    pageSize:  8,
    category: 'general'
  }
   static propTypes ={
     country:  PropTypes.string,
     pageSize:  PropTypes.number,
     category: PropTypes.string
   }

  constructor() {
    super();
    console.log("This  is a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c59dd83fddc4f18bde749e817a31003&page=1page&page=${this.props.pageSize}`;  
    this.setState({loading: true})  // for loading start
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({ 
         articles: parsedData.articles,
         totalResults: parsedData.totalResults ,
         loading: false
        })
                
  }
  handelPreClick=async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c59dd83fddc4f18bde749e817a31003&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})    ///for loading start
    let data = await fetch(url);
    let parsedData = await data.json()
    

    this.setState({
      page: this.state.page-1,
       articles: parsedData.articles,
       loading: false                   //for loading end


    })

  }
  handelNextClick= async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8c59dd83fddc4f18bde749e817a31003&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})     // for loading start
    let data = await fetch(url);
    let parsedData = await data.json()
    

    this.setState({
       page: this.state.page+1,
       articles: parsedData.articles,
       loading:  false                // for loading end 

    })
    }
  
  }
  render() {
    return (
      <div className="container my-4">
      <h1 className="text-center" style ={{margin :'31px'}}>NewsMonkey Top Headlines</h1>
      { this.state.loading && <Spinner/>}
  
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : " "} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          }
          )}

        </div> 
         <div className="contanier d-flex justify-content-between">
         <button  disabled={this.state.page<=1}type="button"  className="btn btn-dark"onClick={this.handelPreClick}>&larr;Previous</button>
         <button  disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button"  className="btn btn-dark"onClick={this.handelNextClick}>Next &rarr;</button>
         </div>

      </div>
    )
  }
}

export default News
