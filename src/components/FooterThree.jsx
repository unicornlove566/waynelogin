import React from 'react';

const FooterThree = () => {
    return (
        <>
            <div id="terminate-portal-session-modal" className="reveal-modal full" data-reveal=""
                 aria-labelledby="modalTitle" aria-hidden="true">
                <div id="terminate-portal-session"
                     style={{
                         fontSize: "16px",
                         color: "#fff",
                         position: "absolute",
                         left: 0,
                         right: 0,
                         top: "20%",
                         textAlign: "center"
                     }}>
                    <img src="./Login - Academica_files/caution.png" width="225" alt=""/>
                    <h4>Portal Session Not Closed</h4>
                    <div style={{textAlign: "left"}}
                         className="large-8 medium-10 small-12 small-centered medium-centered large-centered columns panel">
                        You just logged out of <strong><span
                        className="tas-logout-destination-name"></span></strong> but your session was created
                        with <strong><span className="tas-original-destination-name"></span></strong>.
                        You may terminate your portal session by logging out of <strong><span
                        className="tas-original-destination-name"></span></strong>, or by clicking the button
                        below. <br/><br/>If you wish to keep your session with
                        <strong><span className="tas-original-destination-name"></span></strong> open, simply close this
                        tab or window.
                    </div>
                    <form id="portal-logout-form" action="https://academica.aws.wayne.edu/cs" method="GET">
                        <input type="hidden" name="destination_url" value=""/>
                        <input type="hidden" name="logout" value="1"/>
                        <input type="hidden" name="force" value="1"/>
                        <input type="submit" name="portal-logout-button" value="Logout" className="large button success"
                               id="portal-logout-button"/>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FooterThree;