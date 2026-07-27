/**
 * Full-body loader shown while a page (or its lazy sections) load.
 * Navbar and Footer stay mounted around it — only this body area swaps, so the
 * user sees one clear "loading" state instead of the page flashing the home
 * content or sections popping in one-by-one.
 */
export default function PageLoader() {
  return (
    <div className="page-loader-wrap">
      <span className="app-spinner" />
    </div>
  );
}
