import React from 'react';
import {Posts} from './Posts'


const Post = (props) => (
    <a className="grid__item" href="#">
        <h2 className="title title--preview">{props.title}</h2>
        <div className="loader"></div>
        <span className="category">{props.category}</span>
        <div className="meta meta--preview">
            <img className="meta__avatar" src={props.artist} alt={"author"+props.i} />
            <span className="meta__date"><i className="fa fa-calendar-o"></i> 9 Apr</span>
            <span className="meta__reading-time"><i className="fa fa-clock-o"></i> 3 min read</span>
        </div>
    </a>
);
export class App extends React.Component {
    render(){
        return ( 
        // console.log("App component")
        <div className="container">
        <button id="menu-toggle" className="menu-toggle"><span>Menu</span></button>
        <div id="theSidebar" className="sidebar">
            <button className="close-button fa fa-fw fa-close"></button>

            <span><img className="logo" src={ require( '../../img/runTime.png')}/></span>

        </div>
        <div id="theGrid" className="main">
            <section className="grid">
                <header className="top-bar">
                    <h2 className="top-bar__headline">Latest articles</h2>
                    <div className="filter">
                        <span>Filter by:</span>
                        <span className="dropdown">Popular</span>
                    </div>
                </header>
                {
                    posts.map((p, i) => <Post {...p} i={i} key={i}/> )
                }
                <footer className="page-meta">
                    <span>Load more...</span>
                </footer>
            </section>
            
        </div>
    </div>
        )
    }
}