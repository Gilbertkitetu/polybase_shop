import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fa-twitter } from '@fortawesome/free-solid-svg-icons';

import './styles/footer.css';

function Footer(){
    return(
        <div>
            <div className="footer-pages">
                <h6>About Us</h6>
                <h6>Blog</h6>
                <h6>FAQs</h6>
                <h6>Contact</h6>
                <h6>@EPSB</h6>
            </div>
            <div className="social-media">
            {/* <FontAwesomeIcon icon={fa-twitter} /> */}
            </div>
        </div>
    );
}

export default Footer;