/* =====================================================
   BLOG LOADER & EDITORIAL FORMATTER
===================================================== */

const params = new URLSearchParams(window.location.search);
const postName = params.get("post");
const contentContainer = document.getElementById("content");

/**
 * Helper: Intersection Observer for smooth reveal
 * Matches the logic used in index.html
 */
const initReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
};

/**
 * Editorial Formatter:
 * Applies classes to raw Markdown output to match the centered design.
 */
const formatEditorialContent = (container) => {
  // Add reveal class to all text blocks for consistent animation
  const textElements = container.querySelectorAll("h1, h2, h3, p, ul, ol, blockquote");
  textElements.forEach(el => el.classList.add("reveal"));

  // Refine Image Presentation
  container.querySelectorAll("img").forEach((img, index) => {
    img.classList.add("editorial-img", "reveal");
    
    // First image is full-width
    if (index === 0) {
      img.classList.add("image-full");
    } else {
      // Alternating sides for a clean editorial feel
      img.classList.add(index % 2 === 0 ? "image-right" : "image-left");
    }
  });

  // Emphasize the lead paragraph
  const firstP = container.querySelector("p");
  if (firstP) firstP.classList.add("post-lead");
};

/* =====================================================
   MAIN EXECUTION
===================================================== */

if (!postName) {
  contentContainer.innerHTML = `<p class="reveal">Please select a post from the <a href="blog.html">Blog</a>.</p>`;
  initReveal();
} else {
  // Initial loading state
  contentContainer.innerHTML = `<div class="loading reveal">Gathering thoughts...</div>`;

  /**
   * CRITICAL: Ensure your file is at 'blog/filename.md'
   * The 'blog/' part must match your folder name exactly.
   */
  fetch(`blog/${postName}.md`)
    .then(res => {
      if (!res.ok) throw new Error("File not found");
      return res.text();
    })
    .then(markdown => {
      // Parse Markdown using the 'marked' library
      contentContainer.innerHTML = marked.parse(markdown);

      // Apply centering and editorial styling
      formatEditorialContent(contentContainer);

      // Trigger reveal animations
      initReveal();
    })
    .catch(err => {
      console.error("Blog Error:", err);
      // Clean error state centered on the page
      contentContainer.innerHTML = `
        <div class="error-state reveal" style="text-align: center; padding: 100px 0;">
          <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5rem;">Post not found</h2>
          <p>The article <strong>${postName}.md</strong> was not found in the 'blog' folder.</p>
          <a href="blog.html" class="read-link">← Back to Blog</a>
        </div>`;
      initReveal();
    });
}