import { notFound } from 'next/navigation';

// The site and the admin each have a root layout, so Next has no single
// layout to render unmatched URLs in (its global 404 for that case is still
// experimental). Catching them here shows the site's own not-found page.
export default function Missing() {
  notFound();
}
