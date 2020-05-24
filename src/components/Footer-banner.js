import React from 'react'
import "./css/Herobanner.css";
import {
  isMobile
} from "react-device-detect";
// import ButtonLinkGenderPage from './Button-link-gender-page'
import { Jumbotron, Container } from 'reactstrap';




const FooterBanner = () => (
 <div>
 <div class="css-11zk6ke">
 

<section className="css-1r974q8">
     <header class="css-1wu2h8j">
        <h1>
          <p>Stay Home, <br/>&amp; Get Your Daily Need's</p>
        </h1>
          <p>Start your daily shopping with <strong>TamatarWala</strong>.</p>
          <a href="#feature" >
            <button class="css-j5c32g"><span class="button">Order Now</span>
              <svg width="15.394" height="10" viewBox="0 0 15.394 10">
                <path d="M13.674,6.343,12.427,7.6l2.89,2.877-12.025.012,0,1.768,11.992-.012L12.444,15.1,13.7,16.343l4.988-5.012Z" transform="translate(-3.292 -6.343)">
                </path>
              </svg>
            </button>
          </a>
      </header>
</section>
 </div>
 </div>
);

export default FooterBanner;