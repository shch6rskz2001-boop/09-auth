import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>

        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/notes">Notes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}