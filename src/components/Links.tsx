declare global {
  namespace JSX {
    interface IntrinsicElements {
      "compact-list": CompactListAttributes;
      "useful-link": UsefulLinktAttributes;
    }

    interface CompactListAttributes extends HTMLAttributes {
      size: number;
      complete: boolean;
    }
    interface UsefulLinktAttributes extends HTMLAttributes {
      href: string;
    }
  }
}

import { useState, useEffect } from "preact/hooks";
import { Line as SkeletonLine } from "./Skeleton"

const MAX_ITEMS = 6;

type LinkType = {
  item_id: string,
  url: string,
  title: string,
  added: string,
};

export default function Link() {
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    fetch(`${window.location.origin}/api/get_articles`)
      .then(response => response.json())
      .then(setLinks)
      .catch(console.log);
  }, []);

  return (
    <section class="l-section l-section--center l-section--column l-links">
      <h1 class="l-section__title l-links__title">Things that catch my attention nowadays</h1>

      <compact-list class="c-good-links" size={6} complete={false}>
        {!links.length && Array(MAX_ITEMS).fill("").map(() => {
          return <SkeletonLine slot="list-item" />
        })}

        {links.map(link => (
          <useful-link slot="list-item" class="c-good-links__link"
            href={link.url}>
            {link.title}
          </useful-link>
        ))}

        <button slot="next" class="c-good-links__button c-btn c-btn--animated">show me more</button>
      </compact-list>
    </section>
  );
}