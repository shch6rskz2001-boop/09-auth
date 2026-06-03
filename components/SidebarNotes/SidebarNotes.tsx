import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function Sidebar() {
  return (
    <aside className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes" className={css.menuLink}>
            All notes
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href="/notes?tag=Todo" className={css.menuLink}>
            Todo
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href="/notes?tag=Work" className={css.menuLink}>
            Work
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href="/notes?tag=Personal" className={css.menuLink}>
            Personal
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href="/notes?tag=Meeting" className={css.menuLink}>
            Meeting
          </Link>
        </li>

        <li className={css.menuItem}>
          <Link href="/notes?tag=Shopping" className={css.menuLink}>
            Shopping
          </Link>
        </li>
      </ul>
    </aside>
  );
}