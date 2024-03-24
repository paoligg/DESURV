import React from 'react';

const Footer = () => {
    return (
        <footer className="relative bottom-1 mt-8 flex items-center justify-center gap-10 py-4 text-center">
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
        </footer>
    );
};

export default Footer;
