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
			question: "Was the work submitted via Pull Request or commits in GitHub?",
			answers: [
			{
				answer: "Yes, the actual work has been merged in the project",
				value: 10,
			},
			{
				answer: "Yes, it was submitted in GitHub but has not been merged yet",
				value: 7,
			},
			{
				answer: "No, the work has not been submitted in GitHub",
				value: 5,
			}],
		},
		{
			question: "Does the proposed work contain any grammatical, stylistic or typographic mistakes?",
			answers: [
			{
				answer: "No, the copy is well written and does not contain any mistakes",
				value: 10,
			},
			{
				answer: "The copy contains few minor mistakes",
				value: 9,
			},
			{
				answer: "The copy contains several mistakes that should be corrected as soon as possible",
				value: 7,
			}],
		},
		{
			question: "Was the copywriting work requested by the project?",
			answers: [
			{
				answer: "Yes, the copy was demanded",
				value: 10,
			},
			{
				answer: "No but the copy is of great value covering the needs of the project",
				value: 9,
			},
			{
				answer: "No, it was not",
				value: 8,
			}],
		},
		{
			question: "Is the copy informative and does it attract your attention?",
			answers: [
			{
				answer: "Yes, the copy fullfilled its role and it takes the attention of the reader.",
				value: 10,
			},
			{
				answer: "The copy is not as good to make the reader to be more interested in the project",
				value: 8,
			},
			{
				answer: "No, the copy would benefit from some reworking",
				value: 5,
			}],
		}
	]
};