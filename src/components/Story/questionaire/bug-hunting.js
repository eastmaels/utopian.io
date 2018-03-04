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
		
		// Topic related questions
		{
			question: "Is the bug report formal / professional?",
			answers: [
			{
				answer: "Yes, straight to the point ",
				value: 10,
			},
			{
				answer: "Almost, contains minor informal parts",
				value: 5,
			}
			],
		},
		{
			question: "How severe is the bug?",
			answers: [
			{
				answer: "Critical/Security/Crash, affects very critical functions or sensitive data",
				value: 20,
			},
			{
				answer: "Major, functionality is affected, no workaround",
				value: 15,
			},
			{
				answer: "Minor, functionality is affected, has easy and obvious workaround",
				value: 10,
			},
			{
				answer: "Cosmetic, functionality is not affected",
				value: 5,
			}],
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