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
			question: "Is the documentation good in detail?",
			answers: [
			{
				answer: "Yes, lot's of details and examples",
				value: 20,
			},
			{
				answer: "Yes lot's of details but not many examples",
				value: 10,
			},
			{
				answer: "Not much details",
				value: 5,
			}
			],
		},
		{
			question: "Is the documentation well structured?",
			answers: [
			{
				answer: "Yes, very easy to understand",
				value: 20,
			},
			{
				answer: "A bit complicated but straight to the point",
				value: 10,
			},
			{
				answer: "Difficult to get started",
				value: 5,
			}
			],
		},
	]
};