export default {
  questions: [
    {
      question: "How many feature/s were included?",
      answers: [
        {
          answer: "More than three",
          value: 15*0.8,
        },
        {
          answer: "Two to three",
          value: 10*0.8,
        },
        {
          answer: "Only one",
          value: 5*0.8,
        }
      ],
    },
    {
      question: "How much is the average importance of the feature/s?",
      answers: [
        {
          answer: "Must Have",
          value: 20*0.8,
        },
        {
          answer: "Should Have",
          value: 15*0.8,
        },
        {
          answer: "Could have",
          value: 10*0.8,
        },
        {
          answer: "Won't have this time",
          value: 5*0.8,
        },
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
          value: 1*0.8,
        },
      ],
    },
    {
      question: "How do you rate the amount of work?",
      answers: [
        {
          answer: "Very High",
          value: 40,
        },
        {
          answer: "High",
          value: 30,
        },
        {
          answer: "Medium",
          value: 20,
        },
        {
          answer: "Low",
          value: 5,
        },
      ],
    },
  ]
};