function Page({ page }) {
  if (!page) {
    return <main>Page not found</main>;
  }

  const { title, sections = [] } = page;

  return (
    <main>
      {sections.length === 0 && <p>No sections found for this page.</p>}

      {sections.map((sec) => (
        <section key={sec.slug}>
          {sec.html && <div dangerouslySetInnerHTML={{ __html: sec.html }} />}

          
          {sec.content && !sec.html && <p>{sec.content}</p>}
        </section>
      ))}
    </main>
  );
}

export default Page;
