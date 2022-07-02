import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { FullSizeLoader } from "../loader";
import "./appLayout.css";

export function AppLayout() {
  return (
    <main className="app-layout">
      <div className="app-layout__main">
        <Suspense fallback={<FullSizeLoader />}>
          <Outlet />
        </Suspense>
      </div>
      <nav className="app-layout__nav">
        <ul className="app-layout__list">
          {[
            { text: "🏠", link: "/" },
            { text: "⚙️", link: "/settings" },
            { text: "💹", link: "/spending" },
          ].map(({ text, link }) => (
            <li key={link} className="app-layout__list-item">
              <Link className="app-layout__link" to={link}>
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
