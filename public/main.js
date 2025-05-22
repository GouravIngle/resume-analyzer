// public/main.js
async function analyze() {
    const resumeText = document.getElementById('resume').value;
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resumeText })  // 🔍 Match server.js variable
        });

        const data = await response.json();
        document.getElementById('output').innerText = data.analysis;
    } catch (error) {
        document.getElementById('output').innerText = '❌ Error analyzing resume.';
        console.error(error);
    }
}
