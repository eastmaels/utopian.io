export default {
  questions: [
    {
      question: "How would you rate the criticality of the bug?",
      answers: [
        {
          answer: "Critical",
          value: 15,
        },
        {
          answer: "Major",
          value: 12,
        },
        {
          answer: "Normal",
          value: 10,
        },
        {
          answer: "Minor",
          value: 5,
        }
      ],
    },
    {
      question: "How much coverage do the tests have?",
      answers: [
        {
          answer: "Complete (100%)",
          value: 10,
        },
        {
          answer: "Partial (above 50%)",
          value: 5,
        },
        {
          answer: "Lower than 50%",
          value: 0,
        },
      ],
    },
    {
      question: "How do you rate the amount of work?",
      answers: [
        {
          answer: "Very High",
          value: 25,
        },
        {
          answer: "High",
          value: 20,
        },
        {
          answer: "Medium",
          value: 10,
        },
        {
          answer: "Low",
          value: 5,
        },
      ],
    },
  ]
};