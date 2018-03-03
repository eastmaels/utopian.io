import ideasQuestions from "./ideas";
import developmentQuestions from "./development";
import graphicsQuestions from "./graphics";
import bughuntingQuestions from "./bug-hunting";
import translationsQuestions from "./translations";
import analysisQuestions from "./analysis";
import socialQuestions from "./social";
import documentationQuestions from "./documentation";
import tutorialsQuestions from "./tutorials";
import videotutorialsQuestions from "./video-tutorials";
import copywritingQuestions from "./copywriting";
import blogQuestions from "./blog";
import taskRequestQuestions from "./task-requests";

export const QualitySlider = {
	// Main cetegories
	'ideas': ideasQuestions,
	'development': developmentQuestions,
	'graphics': graphicsQuestions,
	'bug-hunting': bughuntingQuestions,
	'translations': translationsQuestions,
	'analysis': analysisQuestions,
	'social': socialQuestions,
	'documentation': documentationQuestions,
	'tutorials': tutorialsQuestions,
	"video-tutorials": videotutorialsQuestions,
	'copywriting': copywritingQuestions,
	'blog': blogQuestions,

	// Task Requests
	'task-ideas': taskRequestQuestions,
	'task-development': taskRequestQuestions,
	'task-bug-hunting': taskRequestQuestions,
	'task-documentation': taskRequestQuestions,
	'task-translations': taskRequestQuestions,
	'task-analysis': taskRequestQuestions,
	'task-graphics': taskRequestQuestions,
	'task-social': taskRequestQuestions,
	'task-analysis': taskRequestQuestions,
	'task-analysis': taskRequestQuestions,

	
	// Deprecated?
	"sub-projects": {
		questions: []
	},
};

