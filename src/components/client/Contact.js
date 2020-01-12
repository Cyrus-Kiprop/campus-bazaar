import React from 'react';

function Contact() {
    return (
            <div className="login-wrapper">
                <form className="form-wrapper">
                    <h1>Get In Touch With Us</h1>
    <div className="firstname">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" />
    </div>
    <div className="email">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" />
    </div>
    <div className="message">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="5"></textarea>
    </div>
    <button type="submit" className="contactbutton">Submit</button>
</form>
		</div>
            
    )
}

export default Contact;
