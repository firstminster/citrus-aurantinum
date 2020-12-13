import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__info'>
        <div className='footer__info-contactDetails'>
          <h3>Address & Contact Number</h3>
          <p>Delakes Mall, Admiralty Way Opp Pizza Hut, Lekki, Lagos.</p>
          <p> +234-9060005347 - 8</p>
          <p>cc@citrus.com</p>
        </div>

        <div className='footer__info-companyDetails'>
          <h3>Company</h3>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Privacy Policy</p>
        </div>

        <div className='footer__info-socialMedia'>
          <h3>Join Us On</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Whatsapp</p>
        </div>

        <div className='footer__info-paymentMethod'>
          <h3>Payment Method</h3>
          <p>Paystack</p>
          <p>MasterCard</p>
          <p>Verve</p>
          <p>Paypal</p>
        </div>
      </div>
      <div className='footer__info-copyright'>
        <p>&copy; {new Date().getFullYear()} Citrusaurantiumlinks.ng</p>
      </div>
    </footer>
  )
}

export default Footer
