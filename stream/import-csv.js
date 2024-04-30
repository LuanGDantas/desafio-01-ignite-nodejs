import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'

const pathCsv = new URL('tasks.csv', import.meta.url);
const stream = createReadStream(pathCsv, 'utf-8');

(async () => {
  const parser = stream.pipe(parse({ from_line: 2, skipEmptyLines: true }));

  for await (const [ title, description ] of parser) {
    await fetch('http://localhost:3003/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
})();