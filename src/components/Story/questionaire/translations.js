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
			question: "How many translated words?",
			answers: [
			{
				answer: "2000+",
				value: 10,
			},
			{
				answer: "1500-2000",
				value: 5,
			},
			{
				answer: "1000-1500",
				value: 0,
			}
			],
		},
		{
			question: "Are there any traces of machine translation making the work inaccurate?",
			answers: [
			{
				answer: "No",
				value: 5,
			},
			{
				answer: "Yes",
				value: 0,
			}
			],
		},
		{
			question: "Is there code that shouldn’t be translated?",
			answers: [
			{
				answer: "No",
				value: 20,
			},
			{
				answer: "Yes",
				value: 0,
			}
			],
		},
		{
			question: "Is this a proofreading contribution?",
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
		}
	]
};