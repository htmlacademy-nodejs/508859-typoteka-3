"use strict";

const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultURL = `http://localhost:${port}/api/`;

class Api {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
      withCredentials: true,
      headers: {
        'Content-Type': `application/json`,
        'Accept': `application/json`,
      }
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getArticles({offset, limit, comments} = {}) {
    return this._load(`/articles`, {params: {offset, limit, comments}});
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }

  deleteArticle(id) {
    return this._load(`/articles/${id}/delete`, {
      method: `DELETE`
    });
  }

  getAllComments() {
    return this._load(`/articles/all-comments`);
  }

  getArticleComments(id) {
    return this._load(`/articles/${id}/comments`);
  }

  createComment(data, articleId) {
    return this._load(`/articles/${articleId}/comments`, {
      method: `POST`,
      data
    });
  }

  deleteComment(articleId, commentId) {
    return this._load(`/articles/${articleId}/comments/${commentId}`, {
      method: `DELETE`
    });
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getSearchResult(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories(count) {
    return this._load(`/categories`, {params: {count}});
  }

  createCategory(data) {
    return this._load(`/categories`, {
      method: `POST`,
      data
    });
  }

  updateCategory(data, id) {
    return this._load(`/categories/${id}/edit`, {
      method: `PUT`,
      data
    });
  }

  deleteCategory(id) {
    return this._load(`/categories/${id}/delete`, {
      method: `DELETE`
    });
  }
}

const defaultAPI = new Api(defaultURL, TIMEOUT);

module.exports = {
  Api,
  getAPI: () => defaultAPI
};

