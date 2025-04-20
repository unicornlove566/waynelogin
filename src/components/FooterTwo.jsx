import React from 'react';

const FooterTwo = () => {
    return (
        <>
            <div id="establishing-session-modal" className="reveal-modal full" data-reveal=""
                 aria-labelledby="modalTitle" aria-hidden="true">
                <div id="establishing-session"
                     style={{
                         fontSize: "16px",
                         color: "#fff",
                         position: "absolute",
                         left: 0,
                         right: 0,
                         top: "30%",
                         textAlign: "center"
                     }}>
                    <img src="./Login - Academica_files/shield_only_color_drop_shadow.png" width="350" alt=""/>
                    <h4>Please wait</h4>
                    <h5>We are establishing your session with <span className="es-destination-name">Academica</span>...
                    </h5>
                </div>
            </div>
        </>
    );
};

export default FooterTwo;