export const surveysContract = {
    address: '0x5dD92aB856C985cE6Ac614F5f00ccffB5029CAE3',
    abi: [
        {
            type: 'function',
            name: 'answerSurvey',
            inputs: [
                { name: '_surveyId', type: 'uint256', internalType: 'uint256' },
                { name: '_answers', type: 'string', internalType: 'string' },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'createSurvey',
            inputs: [
                { name: '_questions', type: 'string', internalType: 'string' },
                {
                    name: '_maxResponses',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: '_description',
                    type: 'string',
                    internalType: 'string',
                },
                {
                    name: '_publique_key',
                    type: 'string',
                    internalType: 'string',
                },
                {
                    name: '_nombre_question',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'nom_enseigne',
                    type: 'string',
                    internalType: 'string',
                },
            ],
            outputs: [],
            stateMutability: 'payable',
        },
        {
            type: 'function',
            name: 'responses',
            inputs: [
                { name: '', type: 'uint256', internalType: 'uint256' },
                { name: '', type: 'address', internalType: 'address' },
            ],
            outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'returnAnswers',
            inputs: [
                { name: '_surveyId', type: 'uint256', internalType: 'uint256' },
            ],
            outputs: [
                {
                    name: '',
                    type: 'tuple[]',
                    internalType: 'struct SurveyContract.Answer[]',
                    components: [
                        {
                            name: 'surveyId',
                            type: 'uint256',
                            internalType: 'uint256',
                        },
                        {
                            name: 'respondent',
                            type: 'address',
                            internalType: 'address',
                        },
                        {
                            name: 'answers',
                            type: 'string',
                            internalType: 'string',
                        },
                    ],
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'surveyAnswers',
            inputs: [
                { name: '', type: 'uint256', internalType: 'uint256' },
                { name: '', type: 'uint256', internalType: 'uint256' },
            ],
            outputs: [
                { name: 'surveyId', type: 'uint256', internalType: 'uint256' },
                {
                    name: 'respondent',
                    type: 'address',
                    internalType: 'address',
                },
                { name: 'answers', type: 'string', internalType: 'string' },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'surveyCount',
            inputs: [],
            outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'surveys',
            inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
            outputs: [
                { name: 'surveyId', type: 'uint256', internalType: 'uint256' },
                {
                    name: 'creator',
                    type: 'address',
                    internalType: 'address payable',
                },
                { name: 'reward', type: 'uint256', internalType: 'uint256' },
                {
                    name: 'maxResponses',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                { name: 'questions', type: 'string', internalType: 'string' },
                {
                    name: 'numResponses',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                { name: 'open', type: 'bool', internalType: 'bool' },
                { name: 'description', type: 'string', internalType: 'string' },
                { name: 'public_key', type: 'string', internalType: 'string' },
                {
                    name: 'nombre_question',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'nom_enseigne',
                    type: 'string',
                    internalType: 'string',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'withdrawUnclaimed',
            inputs: [
                { name: '_surveyId', type: 'uint256', internalType: 'uint256' },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
        },
        {
            type: 'event',
            name: 'SurveyAnswered',
            inputs: [
                {
                    name: 'surveyId',
                    type: 'uint256',
                    indexed: false,
                    internalType: 'uint256',
                },
                {
                    name: 'respondent',
                    type: 'address',
                    indexed: false,
                    internalType: 'address',
                },
            ],
            anonymous: false,
        },
        {
            type: 'event',
            name: 'SurveyCreated',
            inputs: [
                {
                    name: 'surveyId',
                    type: 'uint256',
                    indexed: false,
                    internalType: 'uint256',
                },
                {
                    name: 'questions',
                    type: 'string',
                    indexed: false,
                    internalType: 'string',
                },
                {
                    name: 'maxResponses',
                    type: 'uint256',
                    indexed: false,
                    internalType: 'uint256',
                },
                {
                    name: 'reward',
                    type: 'uint256',
                    indexed: false,
                    internalType: 'uint256',
                },
            ],
            anonymous: false,
        },
    ],
} as const;
