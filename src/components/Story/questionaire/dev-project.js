export default {
  questions: [
    {
      question: "How much detail does the README contain?",
      answers: [
        {
          answer: "Gone the extra mile",
          value: 20,
        },
        {
          answer: "Complete - contains a project description, installation steps, and a test link",
          value: 20*0.8,
        },
        {
          answer: "Incomplete - lacks any of the minimum required",
          value: 20*0.4,
        },
        {
          answer: "No README (consider rejecting or returning to the contributor)",
          value: 0,
        },
      ],
    },
    {
      question: "How much detail does the project's Roadmap contain?",
      answers: [
        {
          answer: "Above and beyond",
          value: 20,
        },
        {
          answer: "Complete - includes a timeline, planned features, and a development team",
          value: 20*0.8,
        },
        {
          answer: "Incomplete - lacks any of the minimum required",
          value: 20*0.4,
        },
        {
          answer: "No roadmap (consider rejecting or returning to the contributor)",
          value: 0,
        },
      ],
    },
    {
      question: "What are the available features?",
      answers: [
        {
          answer: "Contains more than the Minimum Viable Product (MVP)",
          value: 40,
        },
        {
          answer: "Is a Minimum Viable Product (MVP)",
          value: 40*0.8,
        },
        {
          answer: "Less than a Minimum Viable Product (MVP)",
          value: 40*0.4,
        },
        {
          answer: "No features yet (consider rejecting or returning to the contributor)",
          value: 0,
        },
      ],
    },
  ]
};