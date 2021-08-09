import React from 'react';

import './categoryDir.css';


function CategoryDir () {

    return(
        <div className="category-dir">
            <li>
                <ul><h5>All</h5></ul>
                <ul><h4>/</h4></ul>
                <ul><h5>Bags & Backpacks</h5></ul>
                <ul><h4>/</h4></ul>
                <ul><h5>Decoration</h5></ul>
                <ul><h4>/</h4></ul>
                <ul><h5>Essentials</h5></ul>
                <ul><h4>/</h4></ul>
                <ul><h5>Interior</h5></ul>
            </li>

           
           <button>Filter</button>
        </div>
    );
}

export default CategoryDir;