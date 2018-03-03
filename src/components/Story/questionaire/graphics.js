export default {
    questions: [
        {
            question: "Is the project description formal?",
            answers: [
            {
                answer: "Yes it’s straight to the point",
                value: 10,
            },
            {
                answer: "Need more description ",
                value: 5,
            },
            {
                answer: "Not too descriptive",
                value: 0,
            }],
        },
        {
            question: "Is the language / grammar correct?",
            answers: [
            {
                answer: "Yes",
                value: 20,
            },
            {
                answer: "A few mistakes",
                value: 10,
            },
            {
                answer: "It's pretty bad",
                value: 0,
            }],
        },
        {
            question: "Was the template followed?",
            answers: [
            {
                answer: "Yes",
                value: 10,
            },
            {
                answer: "Partially",
                value: 5,
            },
            {
                answer: "No",
                value: 0,
            }],
        },

		// Topic related questions
		{
            question: "Was the contribution requested?",
            answers: [
            {
                answer: "Yes, it was requested",
                value: 10,
            },
            {
                answer: "No, it is a spontaneous work but it is a benefit for the project",
                value: 5,
            },
			{
                answer: "No",
                value: 0,
            }
            ],
        },
        {
            question: "This contribution is a ...",
            answers: [
            {
                answer: "Merged / Used art work",
                value: 10,
            },
            {
                answer: "Proposal",
                value: 0,
            }
            ],
        },
        {
            question: "How many distinctively different designs are available in the contribution?",
            answers: [
            {
                answer: "5+",
                value: 10,
            },
            {
                answer: "4",
                value: 8,
            },
			{
                answer: "3",
                value: 6,
            },
			{
                answer: "2",
                value: 4,
            },
			{
                answer: "1",
                value: 2,
            },
            ],
        },
        {
            question: "Is the license present for the contribution?",
            answers: [
            {
                answer: "Yes",
                value: 5,
            },
            {
                answer: "No",
                value: 0,
            }
            ],
        },
        {
            question: "Quality of images?",
            answers: [
            {
                answer: "Good Quality",
                value: 5,
            },
            {
                answer: "Acceptable",
                value: 3,
            },
            {
                answer: "Bad Quality",
                value: 0,
            }
            ],
        }
    ]
};