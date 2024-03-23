pragma solidity ^0.8.0;

contract SurveyContract {
    struct Survey {
        uint256 surveyId;
        address payable creator;
        uint256 reward;
        uint256 maxResponses;
        string questions;
        uint256 numResponses;
        bool open;
        string description;
        string public_key;
        uint256 nombre_question;
    }

    struct Answer {
        uint surveyId;
        address respondent;
        string[] answers;
    }

    Survey[] public surveys; // Stores surveys
    mapping(uint => Answer[]) public surveyAnswers; // Stores answers for each survey
    mapping(uint => mapping(address => bool)) public responses; // Tracks if an address has answered a survey
    uint public surveyCount = 0;

    // Event declarations
    event SurveyCreated(uint surveyId, string questions, uint maxResponses, uint reward);
    event SurveyAnswered(uint surveyId, address respondent);

    // Create a new survey with multiple questions
    function createSurvey(string memory _questions, uint _maxResponses,string memory _description,string memory _publique_key,uint256 _nombre_question) public payable {
        require(msg.value > 0, "Reward must be more than 0");
        require(_maxResponses > 0, "There must be at least one response allowed");
        require(msg.value >= _maxResponses, "Reward must cover all responses");

        surveys.push(Survey(surveyCount, payable(msg.sender), msg.value, _maxResponses, _questions, 0, true,_description,_publique_key,_nombre_question));
        surveyCount++;

        emit SurveyCreated(surveyCount - 1, _questions, _maxResponses, msg.value);
    }

    // Answer a survey with multiple responses
    function answerSurvey(uint _surveyId, string[] memory _answers) public {
        Survey storage survey = surveys[_surveyId];

        require(survey.open == true, "Survey is not open");
        require(survey.creator != address(0), "Survey does not exist");
        require(survey.numResponses < survey.maxResponses, "Survey has already reached its response limit");
        require(!responses[_surveyId][msg.sender], "You have already answered this survey");
        

        surveyAnswers[_surveyId].push(Answer(_surveyId, msg.sender, _answers));
        survey.numResponses++;
        responses[_surveyId][msg.sender] = true;

        uint rewardPerResponse = survey.reward / survey.maxResponses;
        payable(msg.sender).transfer(rewardPerResponse);

        emit SurveyAnswered(_surveyId, msg.sender);
    }

    // Optional: Withdraw function for unclaimed funds (for survey creator)
    function withdrawUnclaimed(uint _surveyId) public {
        Survey storage survey = surveys[_surveyId];

        require(msg.sender == survey.creator, "Only the survey creator can withdraw unclaimed funds");
        require(!survey.open || survey.numResponses == survey.maxResponses, "No unclaimed funds available or survey still open");

        uint unclaimed = survey.reward - (survey.numResponses * (survey.reward / survey.maxResponses));
        survey.creator.transfer(unclaimed);

        // Optionally close the survey to prevent further participation
        survey.open = false;
    }
    // Retourne toutes les réponses pour un survey donné
function returnAnswers(uint _surveyId) public view returns (Answer[] memory) {
    require(_surveyId < surveyCount, "Survey does not exist");

    // Récupération du nombre de réponses pour le survey
    uint answerCount = surveyAnswers[_surveyId].length;
    require(answerCount > 0, "No answers for this survey");

    // Création d'un tableau temporaire pour stocker et retourner les réponses
    Answer[] memory answers = new Answer[](answerCount);
    for (uint i = 0; i < answerCount; i++) {
        Answer storage answer = surveyAnswers[_surveyId][i];
        answers[i] = answer;
    }

    return answers;
}
}
