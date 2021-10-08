const BlogForm = ({
  addBlog,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addBlog}>
        <h1>Add a New Blog</h1>
        title: <input onChange={handleTitle} value={title || ""} />
        author: <input onChange={handleAuthor} value={author || ""} />
        url: <input onChange={handleUrl} value={url || ""} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
