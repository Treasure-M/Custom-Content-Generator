🌐 Live Demo: https://custom-content-generator.onrender.com

Custom-Content-Generator
A lightweight, browser-based educational content generator that uses the meta-llama/llama-3.1-405b-instruct model via OpenRouter.ai.. Generate lesson plans, worksheets, assessments, and more—all customizable by topic and grade level.

Features

Powered by OpenRouter + meta-llama/llama-3.1-405b-instruct
5+ optimized prompt templates
Easy-to-use UI with dropdowns for grade, topic, and content type
Download button for offline access to generated content
Client-side only—no backend needed

 How It Works
When a user chooses a content type, grade, and subject, the app formats a prompt string and transmits it to OpenRouter through the fetch() API, utilizing the chosen model. Answers are shown instantly and can be downloaded as .txt files, PDF, and Word .docx.

 Tech Stack
 
HTML/CSS – User interface and layout
JavaScript – API integration, async handling, DOM manipulation
OpenRouter.ai – API backend for LLM access
meta-llama/llama-3.1-405b-instruct – Educational content generation

Sample Use Cases

Grade 9 | Lesson Plan | Cell Structure
Grade 11 | Study Guide | Energy and Work
Grade 12 | Assessment | Genetics
Grade 8 | Activity | Molecule Behavior
Grade 10 | Worksheet | Algebra

 Security Note
 
API keys should never be committed to a public repo. In production, consider using environment variables or a secure key-passing method.

Roadmap

Add caching and offline fallback.
Link to South African curriculum topics.
Implement toxicity filtering
Optimize error handling and retries.

Installation 📦

1. Clone the repository:
   ```bash
   git clone https://github.com/Treasure-M/Custom-Content-Generator.git
2. Install dependencies:

bash

cd Custom-Content-Generator
npm install  # or yarn install
Usage 🛠️
Basic Usage
javascript
const generator = require('./generator');
const content = generator.generate({
  template: 'basic',
  variables: {
    name: 'World'
  }
});

console.log(content); // Outputs: "Hello, World!"

Command Line

bash

node cli.js --template=newsletter --output=./output/newsletter.html
Configuration ⚙️
Create a config.json file to customize the generator:

json
{
  "templatesDir": "./templates",
  "outputDir": "./output",
  "defaultFormat": "html"
}



