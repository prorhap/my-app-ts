import { useState, useEffect } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import "./App.css";

const client = generateClient<Schema>();

export default function App() {
  const [todos, setMemos] = useState<Schema["Memo"]["type"][]>([]);

  const fetchMemos = async () => {
    const { data: items, errors } = await client.models.Memo.list();
    if (!errors) {
      setMemos(items);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const createMemo = async () => {
    const content = window.prompt("Memo");
    if (content) {
      await client.models.Memo.create({
        content
      });
      fetchMemos();
    }
  };

  return (
    <div className="container">
      <button className="button" onClick={createMemo}>Add new memo</button>
      <ul className="list">
        {todos.map(({ id, content }) => (
          <li className="list-item" key={id}>{content}</li>
        ))}
      </ul>
    </div>
  );
}
