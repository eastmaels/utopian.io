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
            question: "Is the code included in the contribution post or a GitHub repository for the tutorial files, if used?",
            answers: [
            {
                answer: "Yes, the code is included in the post or a GitHub repository",
                value: 5,
            },
            {
                answer: "No",
                value: 0,
            }],
        },
		{
            question: "Does the sound contain audible speaking and/or music in the background. There must be minimal background noise?",
            answers: [
            {
                answer: " No, the sound is clear",
                value: 5,
            },
            {
                answer: "Yes, mildly distracting",
                value: 3,
            },
			{
                answer: "Yes, distracting",
                value: 0,
            }],
        },
		{
            question: "Presenter must speak clearly and be easily understandable",
            answers: [
            {
                answer: "Yes, understandable speech",
                value: 5,
            },
            {
                answer: "Mostly understandable speech",
                value: 3,
            },
			{
                answer: "Mostly not understandable speech",
                value: 0,
            }],
        },
		{
            question: "The title of the tutorial and/or the concepts being covered must be present on the video in text form at all times",
            answers: [
            {
                answer: "Title present on the video at all times",
                value: 5,
            },
            {
                answer: "Title is not present on the video at all times",
                value: 0,
            }],
        },
		{
            question: "Concepts covered in the tutorial must be indicated in the post text with brief descriptions of each concept. Text and screenshot images are preferred",
            answers: [
            {
                answer: "Thorough text and images for concepts covered",
                value: 5,
            },
            {
                answer: "Minimal text and images ",
                value: 3,
            },
            {
                answer: "No or very little text and images ",
                value: 0,
            }],
        },
		{
            question: "Tutorials must address a minimum of three substantial concepts and no more than five",
            answers: [
            {
                answer: "3-5 substantial concepts covered in tutorial",
                value: 5,
            },
            {
                answer: "Less than 3 or more than 5 substantial concepts covered in tutorial",
                value: 0,
            }],
        },
		{
            question: "Tutorial videos must be clearly prepared and structured",
            answers: [
            {
                answer: "Presenter is well prepared and video concepts are well structured",
                value: 5,
            },
            {
                answer: "Presenter has moments when he/she seems unprepared and/or unstructured",
                value: 3,
            },
            {
                answer: "Presenter seems unprepared and/video is unstructured",
                value: 0,
            }],
        },
		{
            question: "Contributors must provide a clear text description of all substantial topics covered in a tutorial video",
            answers: [
            {
                answer: "Text describes concepts clearly with a minimum of 150 words",
                value: 5,
            },
            {
                answer: "Text does not describe concepts clearly",
                value: 0,
            }],
        },
		
    ]
};