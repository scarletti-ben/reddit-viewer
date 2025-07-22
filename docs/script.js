/**
 * @fileoverview Entry point for the reddit-viewer application
 * - Imports utilities for interfacing with Reddit JSON API
 * @author Ben Scarletti
 * @version 0.0.5
 * @since 2025-07-19
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 * 
 * @disclaimer THIRD-PARTY API USAGE
 * - This project interacts with the unofficial Reddit JSON API
 * - Usage must comply with Reddit's Terms of Service
 * - The API is subject to change without notice
 * @see {@link https://www.redditinc.com/policies/user-agreement}
 */

// < ======================================================
// < Imports
// < ======================================================

import {
    RedditPost
} from "./components/reddit-post.js";

// < ======================================================
// < Element Queries
// < ======================================================

const page = /** @type {HTMLDivElement} */
    (document.getElementById('page'));

const main = /** @type {HTMLDivElement} */
    (document.getElementById('main'));

const userForm = /** @type {HTMLDivElement} */
    (document.getElementById('user-form'));

const userInput = /** @type {HTMLInputElement} */
    (document.getElementById('user-input'));

const userButton = /** @type {HTMLButtonElement} */
    (document.getElementById('user-button'));

// < ======================================================
// < Helper Functions
// < ======================================================

/**
 * Build a URL for the Reddit API with optional query parameters
 * @param {string} name - Subreddit name
 * @param {'hot'|'new'|'rising'|'controversial'} endpoint - Endpoint name
 * @param {{
 *   limit?: number
 *   t?: 'hour'|'day'|'week'|'month'|'year'|'all',
 * }} [options={}] - Query parameters as key-value pairs
 * @returns {string} URL string used for Reddit API call
 */
export function buildPostPath(name, endpoint, options = {}) {
    const redditBase = 'https://www.reddit.com';
    const subredditLink = redditBase + `/r/${name}`;
    let output = subredditLink + `/${endpoint}.json`;
    for (const [i, [key, value]] of Object.entries(options).entries()) {
        output += i === 0 ? '?' : '&';
        output += `${key}=${value}`;
    }
    return output;
}

// ~ ======================================================
// ~ Entry Point
// ~ ======================================================

/**
 * Entry point for the application (IIFE)
 * @async
 */
(async () => {

    const DEBUGGING = true;

    userButton.addEventListener('click', async (event) => {

        let path;
        if (DEBUGGING) {
            path = `data/test.json`;
        } else {
            const subreddit = userInput.value.trim();
            userInput.value = '';
            if (!subreddit) return;
            path = buildPostPath(subreddit, 'new', { limit: 12, t: 'hour' });
            path += `&_=${Date.now()}`;
        }
        try {

            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            /** @type {responseObject} */
            const json = await response.json();

            userForm.remove();

            /** @type {postObject[]} */
            const rawPosts = json['data']['children'];
            for (const rawPost of rawPosts) {
                const postElement = RedditPost.create(rawPost);
                if (postElement) {
                    main.appendChild(postElement);
                }
            }

        } catch (error) {
            throw new Error(`Error fetching / reading`, { cause: error });
        }

    });

})();