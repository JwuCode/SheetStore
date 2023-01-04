import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import App from 'App';

const SheetSubpage = (props) => {
    const { params: { sheetname } } = props.match; 
    console.log("done");
    return (
       <>
       <p>
         <strong>Sheetname: </strong>
         {props.name}
       </p>
       <p>
         <strong>Download Link: </strong>
         {props.author}
       </p>
     </>
     );
  };
  export default SheetSubpage;