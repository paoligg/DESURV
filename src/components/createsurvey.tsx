import React, { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import './creategameform.css'; 

interface GetSurveyProps {
    surveyname: string;
    onClose: () => void;
}

const CreateSurvey = (props: GetSurveyProps) => {
    const { address: account } = useAccount();
    const [wantedanswers, setWantedAnswer] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [playerPrice, setPlayerPrice] = useState([BigInt(0)]);

    const playerInputs = Array.from({ length: wantedanswers }, (_, index) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const updatedArray = [...playerPrice];
            updatedArray[index] = BigInt(Number(e.target.value));
            setPlayerPrice(updatedArray);
        };

        return (
            <div key={index} className="form-field">
                <span>Player {index + 1}</span>
                <input 
                  type="text" 
                  onChange={handleInputChange}
                  className="input-field" 
                />
            </div>
        );
    });

    // const { write: createSurvey } = useWriteContract({
    //     ...Vault_Contract,
    //     functionName: "createSurvey",
    // });

    const handleCreateSurvey = async () => {
        const sum = playerPrice.reduce((acc, curr) => acc + curr, BigInt(0));
        if (sum === BigInt(100)) {
            // if (account !== undefined) {
            //     await createSurvey({ args: [props.surveyname, BigInt(Number(totalPrice)), playerPrice] });
            // }
        } else {
            console.log("Sum of player prices does not equal total price");
        }
    };

    return (
        <div className="create-game-form">
            <h1 className="form-title">Create Game of {props.surveyname} </h1>
            <button className="close-button" onClick={props.onClose}>Close</button>
            {/* <div className='form-field'>
                <span>Number of players</span>
                <input 
                  type="number" 
                  onChange={(e) => setPlayers(Number(e.target.value))}
                  className="input-field"
                />
            </div> */}
            <div className='form-field'>
                <span>Total Price</span>
                <input 
                  type="number" 
                  onChange={(e) => setTotalPrice(Number(e.target.value) * 10 ** 18)}
                  className="input-field"
                />
            </div>
            <div className='form-field'>
                <span>Price Repartition in % </span>
                {playerInputs}
            </div>
            <button 
              onClick={() => handleCreateSurvey()}
              className="action-button"
            >
              Create Survey
            </button>
        </div>
    );
};

export default CreateSurvey;
