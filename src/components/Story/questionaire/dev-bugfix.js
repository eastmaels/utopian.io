export default {
  questions: [
    {
      question: "How would you rate the criticality of the bug?",
      answers: [
        {
          answer: "Critical",
          value: 20*0.8,
        },
        {
          answer: "Major",
          value: 15*0.8,
        },
        {
          answer: "Normal",
          value: 10*0.8,
        },
        {
          answer: "Minor",
          value: 5*0.8,
        }
      ],
    },
    {
      question: "How much coverage do the tests have?",
      answers: [
        {
          answer: "Complete (100%)",
          value: 10*0.8,
        },
        {
          answer: "Partial (above 50%)",
          value: 5*0.8,
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
          value: 40*0.8,
        },
        {
          answer: "High",
          value: 30*0.8,
        },
        {
          answer: "Medium",
          value: 20*0.8,
        },
        {
          answer: "Low",
          value: 5*0.8,
        },
      ],
    },
  ]
};