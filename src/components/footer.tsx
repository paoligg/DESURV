import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bottom-0 py-4 text-center">
            <p>
                © 2024 DESURV Open-Source Project H-W3B Hackathon
                <a
                    href="https://github.com/paoligg/SiaRaclette_Etherlink"
                    className="flex items-center"
                >
                    <img
                        src="/github.png"
                        height="50"
                        width="50"
                        style={{ margin: 'auto' }}
                    />
                </a>
            </p>
        </footer>
    );
};

export default Footer;
