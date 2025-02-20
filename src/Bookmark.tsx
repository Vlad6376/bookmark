import React, { useState } from "react";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import "./style.css";

const schema = yup.string().url().required();

const BookmarkApp: React.FC = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<{ title: string; url: string }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  const fetchTitle = async (url: string): Promise<string> => {
    try {
      const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
  
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
  
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, "text/html");
      const title = doc.querySelector("title")?.innerText || t("defaultTitle");
  
      return title;
    } catch {
      return t("defaultTitle");
    }
  };

  const handleAddBookmark = async () => {
    try {
      await schema.validate(url);
      if (bookmarks.some((b) => b.url === url)) {
        setError(t("Повторная ссылка"));
        return;
      }
      const title = await fetchTitle(url);
      setBookmarks([...bookmarks, { title, url }]);
      setUrl("");
      setError(null);
    } catch (err) {
      setError(t("Некорректная ссылка"));
    }
  };

  return (
    <div className="container">
      <h1>{t("Добавление закладки")}</h1>
      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("Введи ссылку")}
          className="input-field"
        />
        <button onClick={handleAddBookmark} className="add-button">{t("Добавить")}</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="bookmark-list">
        {bookmarks.map((bookmark, index) => (
          <li key={index} className="bookmark-item">
          <span className="bookmark-title">{bookmark.title}</span>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-link"
          >
            {bookmark.url}
          </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarkApp;

