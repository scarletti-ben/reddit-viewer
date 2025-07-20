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

// ~ ======================================================
// ~ Entry Point
// ~ ======================================================

/**
 * Entry point for the application (IIFE)
 * @async
 */
(async () => {

    // Request data from URL and convert to JSON
    const path = `data/test.json`;
    const response = await fetch(path);

    /** @type {responseObject} */
    const json = await response.json();

    /** @type {postObject[]} */
    const rawPosts = json['data']['children'];
    for (const rawPost of rawPosts) {
        const postElement = RedditPost.create(rawPost);
        if (postElement) {
            main.appendChild(postElement);
        }
    }

})();