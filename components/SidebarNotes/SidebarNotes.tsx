'use client'; // ← додано

import Link from "next/link";
import { useSearchParams } from 'next/navigation'; // ← додано
import css from "./SidebarNotes.module.css";

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  const searchParams = useSearchParams(); // ← додано
  const currentTag = searchParams.get('tag'); // ← додано

  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href="/notes"
            className={`${css.menuLink} ${currentTag === null ? css.active : ''}`}
          >
            All notes
          </Link>
        </li>

        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes?tag=${tag}`}
              className={`${css.menuLink} ${currentTag === tag ? css.active : ''}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}