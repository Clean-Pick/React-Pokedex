import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";


export default function Index() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Home page</h1>
      <Suspense fallback={<div>Chargement de l'application...</div>}>
        <Await resolve={data}>
          {(data) => {
            const sortedResults = [...data.results].sort((a, b) =>
              a.name.localeCompare(b.name)
            );

            return (
              <ul>
                {sortedResults.map((result) => (
                  <li key={result.name}>
                    <Link to={`/${result.name}`}>{result.name}</Link>
                  </li>
                ))}
              </ul>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
