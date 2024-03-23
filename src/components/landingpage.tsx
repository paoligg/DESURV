import React from 'react';
import {useReadContract} from 'wagmi';

const LandingPage = () => {
// const { data: numberGames } = useReadContract({
//         ...Vault_Contract,
//         functionName: "getNumberGames",
//     });


  return (
    <div className="grid-container">
      <div className="teamSection">
        <div className="teamMembers">
          
          <div className="teamMember">
            <a href="https://www.linkedin.com/in/antoine-sirot/">
              <img src="/images/antoine.jpg" alt="Antoine" className="roundImage"/>
            </a>
            <div className="memberName">Antoine</div>
          </div>
          <div className="teamMember">
            <a href="https://www.linkedin.com/in/hugo-schneegans/">
              <img src="/images/hugo.jpeg" alt="Hugo" className="roundImage" />
            </a>
            <div className="memberName">Hugo</div>
          </div>
          <div className="teamMember">
            <a href="https://www.linkedin.com/in/paolig-blan/">
              <img src="/images/paolig.jpg" alt="Paolig" className="roundImage" />
            </a>
            <div className="memberName">Paolig</div>
          </div>
          <div className="teamMember">
            <a href="https://www.linkedin.com/in/jean-teyssedre-106145258/">
              <img src="/images/jean.jpeg" alt="Jean" className="roundImage" />
            </a>
            <div className="memberName">Jean</div>
          </div>
          <div className="teamMember">
            <a href="https://www.linkedin.com/in/zakaria-abouliatim/">
              <img src="" alt="Zakaria" className= "roundImage" />
            </a>
            <div className="memberName">Zakaria</div>
          </div>
          </div>
        </div>
    </div>

  );
};

export default LandingPage;
