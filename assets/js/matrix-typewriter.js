// Matrix Rain Effect
(function() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]|;:<>~/=+-_';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#12d640';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = `rgba(18, 214, 64, ${Math.random() * 0.5 + 0.1})`;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();

// Typewriter Effect
(function() {
  const codeSnippets = [
    // Developer Credit
    '// Developed by Anamul Haque Sohel | Full-Stack .NET Developer',
    '// Anamul Haque Sohel | Software Engineer | AI/ML Enthusiast',
    '// Portfolio: itsorionz.github.io | GitHub: github.com/itsorionz',
    // C# / .NET
    '[ApiController] [Route("api/[controller]")] public class TestController : ControllerBase',
    'public class Repository<T> : IRepository<T> where T : class { private readonly AppDbContext _context; }',
    'var results = issues.Where(i => i.Labels.Contains("bug")).Select(i => new TestDto { IssueId = i.Id })',
    'using Microsoft.Playwright; var playwright = await Playwright.CreateAsync(); var browser = await playwright.Chromium.LaunchAsync()',
    'using System.Text.Json; var content = new StringContent(JsonSerializer.Serialize(request))',
    'using Azure.AI.OpenAI; var client = new OpenAIClient(new Uri(endpoint), new AzureKeyCredential(key))',
    'using Anthropic; public class AnthropicProvider { private readonly AnthropicClient _client; }',
    'using Mistral.SDK; var response = await _client.ChatCompletionAsync(request)',
    'using Microsoft.Extensions.AI; using Microsoft.SemanticKernel;',
    'var pipeline = context.Transforms.Text.FeaturizeText("TitleFeaturized").Append(context.BinaryClassification.Trainers.SdcaLogisticRegression())',
    'await page.GotoAsync("https://example.com/login"); await page.FillAsync("#email", "test@example.com")',
    'await page.ClickAsync("button[type=\'submit\']"); await page.WaitForURLAsync("**/dashboard")',
    'var chatOptions = new ChatCompletionsOptions { DeploymentName = "gpt-4", Messages = { new ChatRequestSystemMessage("You are a test generator") } }',
    'public async Task<string> GenerateTestsAsync(string issue) { var chat = new ChatHistory("You are a Playwright test generator"); }',
    '[HttpPost("generate")] public async Task<IActionResult> GenerateTests([FromBody] IssueDto issue)',
    'private readonly DbSet<T> _dbSet; public async Task<IEnumerable<T>> GetAllAsync() { return await _dbSet.ToListAsync(); }',
    'public record Developer(string Name, string Role, string[] Skills);',
    'var dev = new Developer("Anamul Haque Sohel", "Software Engineer", new[] { ".NET", "React", "Python" });',
    '[MaxLength(100)] [Required] public string FullName { get; set; } = string.Empty;',
    'await context.Users.Where(u => u.IsActive).Select(u => new UserDto { Id = u.Id }).ToListAsync();',
    'var handler = new JwtSecurityTokenHandler(); var token = handler.CreateToken(descriptor);',
    'builder.Services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo { Title = "API" }); });',
    '[Authorize(Roles = "Admin")] [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id)',
    'IAsyncEnumerable<Score> GetScoresAsync() { await foreach (var s in scores) yield return s; }',
    // C++
    '#include <iostream>; using namespace std; int main() { cout << "Hello World" << endl; }',
    'template <typename T> T findMax(T a, T b) { return (a > b) ? a : b; }',
    'class Node { public: int data; Node* next; Node(int val) : data(val), next(nullptr) {} };',
    'vector<int> mergeSort(vector<int>& arr) { if (arr.size() <= 1) return arr; int mid = arr.size() / 2; }',
    'auto future = std::async(std::launch::async, [&]() { return compute(data); });',
    'std::shared_ptr<Socket> sock = std::make_shared<Socket>(endpoint);',
    'unique_ptr<Matrix> result = make_unique<Matrix>(Matrix::multiply(a, b));',
    'void ThreadPool::worker() { while (auto task = queue.pop()) { task->execute(); } }',
    'unordered_map<string, vector<int>> graph; graph["A"].push_back("B");',
    'cv::Mat img = cv::imread("image.jpg"); cv::cvtColor(img, img, cv::COLOR_BGR2GRAY);',
    // Python / AI
    'client = OpenAI(api_key=os.getenv("OPENAI_API_KEY")); response = client.chat.completions.create(model="gpt-4")',
    'import anthropic; client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))',
    'genai.configure(api_key=os.getenv("GOOGLE_API_KEY")); model = genai.GenerativeModel("gemini-pro")',
    'import ollama; response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}])',
    'response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers={"Authorization": f"Bearer {api_key}"})',
    'import torch; import torch.nn as nn; class TestClassifier(nn.Module): def __init__(self): super().__init__()',
    'model = models.Sequential([layers.Conv2D(32, (3,3), activation="relu", input_shape=(28,28,1)), layers.MaxPooling2D((2,2))])',
    'from transformers import pipeline; classifier = pipeline("text-classification"); generator = pipeline("text-generation")',
    'from langchain.prompts import PromptTemplate; from langchain.chains import LLMChain',
    'import tensorflow as tf; model.compile(optimizer="adam", loss="sparse_categorical_crossentropy")',
    'from fastapi import FastAPI; from pydantic import BaseModel; app = FastAPI()',
    'from celery import Celery; celery_app = Celery("agent", broker="redis://localhost:6379")',
    'from sklearn.ensemble import RandomForestClassifier; model = RandomForestClassifier(n_estimators=100)',
    'from sklearn.model_selection import train_test_split; X_train, X_test, y_train, y_test = train_test_split(X, y)',
    'tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf"); model = AutoModelForCausalLM.from_pretrained()',
    'import cv2; from ultralytics import YOLO; model = YOLO("yolov8n.pt"); results = model("image.jpg")',
    'import spacy; nlp = spacy.load("en_core_web_sm"); vectorizer = TfidfVectorizer(max_features=5000)',
    'from openai import OpenAI; client = OpenAI(); result = client.audio.transcriptions.create(model="whisper-1")',
    'import matplotlib.pyplot as plt; from sklearn.metrics import confusion_matrix; sns.heatmap(cm, annot=True)',
    'from transformers import AutoTokenizer, AutoModelForCausalLM; outputs = model.generate(**inputs, max_new_tokens=512)',
    'import numpy as np; X = np.array(df.drop("passed", axis=1)); y = np.array(df["passed"])',
    'router.post("/generate-tests") async def generate_tests(issue: IssueRequest): return {"tests": response.choices[0].message.content}',
    'def generate_with_openai(prompt): response = client.chat.completions.create(model="gpt-4", messages=[...])',
    'def generate_with_claude(prompt): response = client.messages.create(model="claude-sonnet-4-20250514", max_tokens=4096)',
    'def generate_with_gemini(prompt): response = model.generate_content(prompt); return response.text',
    'def generate_with_ollama(prompt, model="llama3"): response = ollama.chat(model=model, messages=[...])',
    'from dataclasses import dataclass; @dataclass class Profile: name: str; role: str; skills: list',
    'import asyncio; async def fetch_data(url): async with aiohttp.ClientSession() as session: return await session.get(url)',
    'from pydantic import BaseModel, Field; class Developer(BaseModel): name: str = Field(..., min_length=1)',
    'from functools import lru_cache; @lru_cache(maxsize=128) def fibonacci(n): return n if n < 2 else fibonacci(n-1) + fibonacci(n-2)',
    'import redis; r = redis.Redis(host="localhost", port=6379); r.set("developer", "Anamul Haque Sohel")',
    'from contextlib import contextmanager; @contextmanager def managed_resource(): yield resource; resource.cleanup()',
    'from typing import AsyncGenerator; async def stream_results() -> AsyncGenerator[dict, None]: yield {"status": "ok"}',
    'from pathlib import Path; config = Path("config.yaml"); data = yaml.safe_load(config.read_text())',
    // TypeScript
    "import { test, expect } from '@playwright/test'; test('should login', async ({ page }) => {",
    "await page.goto('/login'); await page.fill('#email', 'test@example.com'); await page.click('button')",
    // Data Science
    'from sklearn.metrics import classification_report; print(classification_report(y_true, y_pred))',
    'from sklearn.feature_extraction.text import TfidfVectorizer; X = vectorizer.fit_transform(df["text"])',
    'from sklearn.naive_bayes import MultinomialNB; clf = MultinomialNB(); clf.fit(X_train, y_train)',
    'from sklearn.svm import SVC; model = SVC(kernel="rbf", C=1.0); model.fit(X_train, y_train)',
    'from sklearn.cluster import KMeans; kmeans = KMeans(n_clusters=3); kmeans.fit(X)',
    'from sklearn.decomposition import PCA; pca = PCA(n_components=2); X_reduced = pca.fit_transform(X)',
    'from sklearn.preprocessing import StandardScaler; scaler = StandardScaler(); X_scaled = scaler.fit_transform(X)',
    'from sklearn.pipeline import Pipeline; pipe = Pipeline([("scaler", StandardScaler()), ("svc", SVC())])',
    'from sklearn.model_selection import cross_val_score; scores = cross_val_score(model, X, y, cv=5)',
    'from sklearn.metrics import roc_auc_score; auc = roc_auc_score(y_test, y_prob)',
    // Deep Learning
    'import torch.optim as optim; optimizer = optim.Adam(model.parameters(), lr=0.001)',
    'criterion = nn.CrossEntropyLoss(); loss = criterion(outputs, labels); loss.backward()',
    'from torch.utils.data import DataLoader; loader = DataLoader(dataset, batch_size=32, shuffle=True)',
    'model.train(); for epoch in range(10): for batch in loader: optimizer.zero_grad(); loss.backward()',
    'model.eval(); with torch.no_grad(): outputs = model(inputs); predictions = torch.argmax(outputs, dim=1)',
    'from torchvision import transforms; transform = transforms.Compose([transforms.ToTensor()])',
    'import torch.nn.functional as F; x = F.relu(self.conv1(x)); x = F.max_pool2d(x, 2)',
    'from torch.optim.lr_scheduler import StepLR; scheduler = StepLR(optimizer, step_size=7, gamma=0.1)',
    'wandb.init(project="test-generation"); wandb.log({"loss": loss.item(), "accuracy": acc})',
    'import mlflow; mlflow.log_metric("accuracy", 0.95); mlflow.log_param("epochs", 10)'
  ];

  const container = document.getElementById('typewriter-container');
  const maxLines = 8;

  function createTypewriterLine() {
    if (container.children.length >= maxLines) return;

    const line = document.createElement('div');
    line.className = 'typewriter-line';
    line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    line.style.top = Math.random() * 80 + 5 + '%';
    line.style.left = Math.random() * 20 + 5 + '%';
    line.style.animationDuration = (Math.random() * 3 + 3) + 's';
    container.appendChild(line);

    setTimeout(() => line.classList.add('typing'), 100);

    setTimeout(() => {
      line.classList.add('fading');
      setTimeout(() => line.remove(), 1000);
    }, 5000 + Math.random() * 3000);
  }

  setInterval(createTypewriterLine, 1500);
  for (let i = 0; i < 4; i++) setTimeout(createTypewriterLine, i * 500);
})();
