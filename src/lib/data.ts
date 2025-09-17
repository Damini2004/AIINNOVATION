import type { CodeSnippet, Language } from './types';

export const categories = ['All', 'React', 'JavaScript', 'Python', 'CSS', 'TypeScript', 'Hooks', 'Utils'];

export const languages: { value: Language; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'css', label: 'CSS' },
    { value: 'html', label: 'HTML' },
    { value: 'bash', label: 'Bash' },
];


export const initialSnippets: CodeSnippet[] = [
  {
    id: 'snippet-1',
    title: 'React Custom Hook for Fetching Data',
    description: 'A simple and reusable custom hook for fetching data in React components. It handles loading, error, and data states.',
    language: 'javascript',
    tags: ['React', 'Hooks', 'JavaScript'],
    code: `import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;`,
  },
  {
    id: 'snippet-2',
    title: 'Python Flask Hello World',
    description: 'A minimal Flask application that serves a "Hello, World!" message. The perfect starting point for any web project in Python.',
    language: 'python',
    tags: ['Python'],
    code: `from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`,
  },
  {
    id: 'snippet-3',
    title: 'Modern CSS Button with Gradient',
    description: 'A stylish, modern button created with CSS. It features a gradient background, a subtle hover effect, and a clean design.',
    language: 'css',
    tags: ['CSS'],
    code: `
.modern-button {
  background: linear-gradient(45deg, #BE4DE1, #F505A9);
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.modern-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
    `,
  },
  {
    id: 'snippet-4',
    title: 'TypeScript Generic Function',
    description: 'A generic function in TypeScript that can take any type and return it. This demonstrates the power and flexibility of generics.',
    language: 'typescript',
    tags: ['TypeScript', 'Utils'],
    code: `function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("myString");
let output2 = identity<number>(100);

console.log(output1);
console.log(output2);
`,
  },
  {
    id: 'snippet-5',
    title: 'Debounce Function in JavaScript',
    description: 'A utility function that delays invoking a function until after a certain amount of time has passed since the last time it was invoked. Useful for performance-critical events like search input.',
    language: 'javascript',
    tags: ['JavaScript', 'Utils'],
    code: `function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example usage:
const handleSearch = (query) => {
  console.log('Searching for:', query);
};

const debouncedSearch = debounce(handleSearch, 300);

// In your event listener:
// inputElement.addEventListener('input', (e) => debouncedSearch(e.target.value));
`
  }
];
