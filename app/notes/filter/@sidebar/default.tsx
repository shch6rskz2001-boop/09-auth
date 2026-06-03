

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <Link href="/notes">All notes</Link>
          </li>
          <li>
            <Link href="/notes?tag=Todo">Todo</Link>
          </li>
          <li>
            <Link href="/notes?tag=Work">Work</Link>
          </li>
          <li>
            <Link href="/notes?tag=Personal">Personal</Link>
          </li>
          <li>
            <Link href="/notes?tag=Meeting">Meeting</Link>
          </li>
          <li>
            <Link href="/notes?tag=Shopping">Shopping</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}