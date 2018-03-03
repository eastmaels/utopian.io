export default {
	questions: [
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
		{
			question: "Is the bug report formal / informal?",
			answers: [
			{
				answer: "Yes straight to the point",
				value: 50,
			},
			{
				answer: "No steps to reproduce",
				value: 25,
			},
			{
				answer: "Not informal and not formal",
				value: 0,
			}
			],
		},
		{
			question: "Is there visual presentation provided for the bug?",
			answers: [
			{
				answer: "Yes",
				value: 10,
			},
			{
				answer: "Yes but low quality",
				value: 5,
			},
			{
				answer: "No",
				value: 0,
			},
			],
		},
		{
			question: "Is there any unrelated content in the bug report?",
			answers: [
			{
				answer: "No, post solely discusses only talk about the bug report",
				value: 10,
			},
			{
				answer: "Yes, personal intro or other unrelated content ",
				value: 0,
			}
			],
		}
	]
};