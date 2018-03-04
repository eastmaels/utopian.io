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
			question: "Were the reasons for creating the analysis explained enough?",
			answers: [
			{
				answer: "Yes, it was explained well why the analysis was created",
				value: 10,
			},
			{
				answer: "No, it is not",
				value: 0,
			}],
		},
		{
			question: "Is it a recurring analysis?",
			answers: [
			{
				answer: "No, it is a new analysis",
				value: 20,
			},
			{
				answer: "Yes but the data are well processed and presented.",
				value: 12,
			},
			{
				answer: "Yes, it is a recurring analysis with different time period",
				value: 4,
			}],
		},
		{
			question: "Where the tools and query scripts used included in the contribution?",
			answers: [
			{
				answer: "Yes, both tools and scripts were included",
				value: 10,
			},
			{
				answer: "No, the query script was not included in the contribution.",
				value: 5,
			},
			{
				answer: "No",
				value: 0,
			}],
		},
	]
};