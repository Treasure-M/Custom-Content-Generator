# Custom-Content-Generator
A lightweight, browser-based educational content generator that uses the meta-llama/llama-3.1-405b-instruct model via OpenRouter.ai.. Generate lesson plans, worksheets, assessments, and more—all customizable by topic and grade level.

Features

Powered by OpenRouter + meta-llama/llama-3.1-405b-instruct
5+ optimized prompt templates
Easy-to-use UI with dropdowns for grade, topic, and content type
Download button for offline access to generated content
Client-side only—no backend needed

 How It Works
When a user selects a content type, grade, and topic, the app formats a prompt string and sends it to OpenRouter via the fetch() API using the selected model. Responses are displayed immediately and can be downloaded as .txt files, pdf and word.docx.

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

Add caching and offline fallback
Connect to South African curriculum topics
Implement toxicity filtering
Optimize error handling and retries
