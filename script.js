document.addEventListener("DOMContentLoaded", () => {
  const genForm = document.getElementById("genForm");
  const outputEl = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");
  const loadingEl = document.getElementById("loading");
  const downloadOptions = document.getElementById("downloadOptions");
  const downloadPdfBtn = document.getElementById("downloadPdfBtn");
  const downloadWordBtn = document.getElementById("downloadWordBtn");
  const downloadTxtBtn = document.getElementById("downloadTxtBtn");

  // Load previous result from local storage
  const lastGenerated = localStorage.getItem("lastGenerated");
  if (lastGenerated) {
    outputEl.textContent = lastGenerated;
    outputSection.style.display = "block";
    downloadOptions.style.display = "block";
  }

  genForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const apiKey = "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";
    const contentType = document.getElementById("contentType").value;
    const gradeLevel = document.getElementById("gradeLevel").value;
    const topic = document.getElementById("topic").value.trim();
    const difficulty = document.getElementById("difficulty").value;

    if (topic.length < 3) {
      alert("Please enter a valid topic.");
      return;
    }

    const prompt = `Write a ${difficulty.toLowerCase()} ${contentType.toLowerCase()} for Grade ${gradeLevel.replace(
      "Grade ",
      ""
    )} students on "${topic}". Use section titles with no markdown symbols. Include explanations, bullet points, and examples where helpful. Do not include user prompts, internal notes, disclaimers, or any references to AI. Only return the final student-facing content.`;

    outputEl.textContent = "";
    loadingEl.style.display = "block";
    outputSection.style.display = "none";
    downloadOptions.style.display = "none";

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct:free"
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      let content = data.choices?.[0]?.message?.content || "⚠️ No content returned.";

      // Clean out unwanted preamble or markdown symbols
      content = content
        .replace(/^.*?(?=Title:|Lesson:|Introduction|Photosynthesis)/is, "")
        .replace(/^#+\s*/gm, "")
        .replace(/User\sasks:.*$/gi, "")
        .replace(/Prompt:.*$/gi, "")
        .replace(/As\s(an\s)?AI.*$/gi, "")
        .replace(/Disclaimer:.*$/gi, "")
        .trim();

      outputEl.textContent = content;
      outputSection.style.display = "block";
      downloadOptions.style.display = "block";
      localStorage.setItem("lastGenerated", content);
    } catch (err) {
      outputEl.textContent = `⚠️ Error: ${err.message}`;
      outputSection.style.display = "block";
      downloadOptions.style.display = "none";
    } finally {
      loadingEl.style.display = "none";
    }
  });

  // PDF Download Handler
  downloadPdfBtn.addEventListener("click", () => {
    const text = outputEl.textContent;
    if (!text.trim()) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Split the text into lines that fit the PDF
    const lines = doc.splitTextToSize(text, 180);
    
    // Add content to PDF
    doc.setFontSize(12);
    doc.text(lines, 10, 10);
    
    // Save the PDF
    doc.save("generated_content.pdf");
  });

  // Word Download Handler
  downloadWordBtn.addEventListener("click", () => {
    const text = outputEl.textContent;
    if (!text.trim()) return;

    // Create HTML content for Word document
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Generated Content</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.5; }
          h1, h2, h3 { color: #2a2a2a; }
        </style>
      </head>
      <body>
        ${text.replace(/\n/g, "<br>")}
      </body>
      </html>
    `;

    // Create Blob and download
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_content.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Text Download Handler
  downloadTxtBtn.addEventListener("click", () => {
    const text = outputEl.textContent;
    if (!text.trim()) return;

    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "generated_content.txt";
    a.click();
  });

});
