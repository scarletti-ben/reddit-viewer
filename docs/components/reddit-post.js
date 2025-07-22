/**
 * @fileoverview Reddit Post Custom Web Component
 * @author Ben Scarletti
 * @since 2025-07-20
 * @see {@link https://github.com/scarletti-ben}
 * @license MIT
 */

// < ======================================================
// < Internal HTML String
// < ======================================================

/**
 * HTML string for a post element
 * @type {string}
 */
const HTML_STRING = /*html*/`

<div class="post-container">
    <div class="post-content">
        <div class="post-header">
            <span class="post-subreddit"></span>
            <div class="post-info">
                <span class="post-username"></span>
                <span class="post-time"></span>
                <span class="post-identifier" data-identifier="unknown"></span>
            </div>
        </div>
    <div class="post-title"></div>
    <div class="post-tag-container">
        <span class="post-tag"></span>
    </div>
    <div class="post-media-container"></div>
    <div class="post-text"></div>
    <div class="post-stats-container">
        <span class="post-stat-comments"></span>
        <span class="post-stat-upvotes"></span>
        <span class="post-stat-hotness"></span>
    </div>
  </div>
</div>

`;

// < ======================================================
// < Internal CSS Styling String
// < ======================================================

/**
 * CSS styling string for post elements
 * @type {string}
 */
const CSS_STRING = /*css*/`

.post-container {
    min-width: 0px;
    /* max-height: 400px; */
    margin: 0px;
    padding: 0px;
    position: relative;
    box-sizing: border-box;
    /* overflow: hidden; */
}

.post-content {
    background: rgba(147, 51, 234, 0.1);
    border: 1px solid rgba(147, 51, 234, 0.2);
    border-radius: 16px;
    padding: 24px;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.post-subreddit {
    color: #a855f7;
    font-weight: 600;
    font-size: 14px;
}

.post-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #9ca3af;
}

.post-username {
    color: #e1e1e6;
}

.post-identifier {
    width: 16px;
    height: 16px;
    background:rgb(141, 63, 214);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    user-select: none;
    color: white;
}

.post-identifier:hover::after {
    content: "ID: " attr(data-identifier);
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    color: #9333ea;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    border: 1px solid #9333ea;
    z-index: 100;
}

.post-time {
    color: #6b7280;
}

.post-title {
    font-size: 18px;
    font-weight: 600;
    color: #f3f4f6;
    margin-bottom: 12px;
    line-height: 1.4;
}

.post-tag-container {
    margin-bottom: 16px;
}

.post-tag {
    background: rgba(147, 51, 234, 0.2);
    color: #c084fc;
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    box-sizing: border-box;
    border: 1px solid rgba(147, 51, 234, 0.3);
}

.post-media-container {
    min-width: 0px;
    min-height: 0px;
    height: 180px;
    width: 100%;
    margin-bottom: 16px;
    box-sizing: border-box;
    overflow: hidden;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

.post-media-container > img {
    max-height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border-radius: 12px;
    /* object-fit: contain; */
}

.post-media-container > video {
    cursor: pointer;
    max-height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 2px solid transparent;
    border-radius: 12px;
}

.post-media-container > video:hover {
    border: 2px solid white;
}

.post-text {
    /* max-height: 200px; */
    font-size: 15px;
    line-height: 1.6;
    color: #d1d5db;
    margin-bottom: 12px;
    /* overflow: hidden; */
}

.post-stats-container {
    display: flex;
    gap: 20px;
    font-size: 13px;
    color: #9ca3af;
    padding-top: 16px;
    border-top: 1px solid rgba(147, 51, 234, 0.2);
}

.post-stat-comments,
.post-stat-upvotes,
.post-stat-hotness {
    font-weight: 600;
}

`

// < ======================================================
// < Internal Time Formatting Function
// < ======================================================

/**
* Format Unix timestamp as a "time ago" string
* @param {number} timestamp - Unix timestamp in seconds
* @returns {string} Formatted string ("just now", "5m ago", "3h ago")
*/
function formatTimeAgo(timestamp) {
    const now = Date.now() / 1000;
    const delta = now - timestamp;
    if (delta < 60) return 'just now';
    if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
    if (delta < 2592000) return `${Math.floor(delta / 86400)}d ago`;
    if (delta < 31536000) return `${Math.floor(delta / 2592000)}mo ago`;
    return `${Math.floor(delta / 31536000)}y ago`;
}

// < ======================================================
// < Internal String Decoder Function
// < ======================================================

/**
 * Decode HTML entities in a string (eg. &amp;)
 * @param {string} str - The HTML-encoded string
 * @returns {string} Decoded plain-text string
 */
function decodeString(str) {
    const entities = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' ',
        '&copy;': '©',
        '&reg;': '®',
        '&euro;': '€',
        '&pound;': '£',
        '&yen;': '¥',
        '&cent;': '¢',
        '&mdash;': '—',
        '&ndash;': '–',
        '&hellip;': '…',
        '&lsquo;': '‘',
        '&rsquo;': '’',
        '&ldquo;': '“',
        '&rdquo;': '”'
    };
    return str.replace(/&[^;]+;/g, entity => entities[entity] || entity);
}
// > ======================================================
// > Exported RedditPost Custom Element
// > ======================================================

/**
 * Simple Reddit post custom element
 * @element reddit-post
 */
export class RedditPost extends HTMLElement {

    /** @type {string} HTML structure within element */
    innerHTML;

    /** @type {Element} Subreddit name element */
    _subreddit;

    /** @type {Element} Username element */
    _username;

    /** @type {Element} Time element */
    _time;

    /** @type {Element} Identifier element */
    _identifier;

    /** @type {Element} Title element */
    _title;

    /** @type {Element} Tag element */
    _tag;

    /** @type {Element} Tag container element */
    _tagContainer;

    /** @type {Element} Media container element */
    _mediaContainer;

    /** @type {Element} Text content element */
    _text;

    /** @type {Element} Comments stat element */
    _comments;

    /** @type {Element} Upvotes stat element */
    _upvotes;

    /** @type {Element} Hotness stat element */
    _hotness;

    /** @type {Element} Stats container element */
    _statsContainer;

    /** @type {Element} Post container element */
    _postContainer;

    /** @type {Element} Post content element */
    _postContent;

    /** @type {Element} Post header element */
    _postHeader;

    /** @type {Element} Post info element */
    _postInfo;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<style>${CSS_STRING}</style>` + HTML_STRING;
        this._subreddit = this.shadowRoot.querySelector('.post-subreddit');
        this._username = this.shadowRoot.querySelector('.post-username');
        this._time = this.shadowRoot.querySelector('.post-time');
        this._identifier = this.shadowRoot.querySelector('.post-identifier');
        this._title = this.shadowRoot.querySelector('.post-title');
        this._tag = this.shadowRoot.querySelector('.post-tag');
        this._tagContainer = this.shadowRoot.querySelector('.post-tag-container');
        this._mediaContainer = this.shadowRoot.querySelector('.post-media-container');
        this._text = this.shadowRoot.querySelector('.post-text');
        this._comments = this.shadowRoot.querySelector('.post-stat-comments');
        this._upvotes = this.shadowRoot.querySelector('.post-stat-upvotes');
        this._hotness = this.shadowRoot.querySelector('.post-stat-hotness');
        this._statsContainer = this.shadowRoot.querySelector('.post-stats-container');
        this._postContainer = this.shadowRoot.querySelector('.post-container');
        this._postContent = this.shadowRoot.querySelector('.post-content');
        this._postHeader = this.shadowRoot.querySelector('.post-header');
        this._postInfo = this.shadowRoot.querySelector('.post-info');
    }

    /**
     * Create a post element using Reddit post object
     * @param {postObject} postObject - Reddit post object
     * @returns {Element | undefined} The `<reddit-post>` element
     */
    static create(postObject) {

        const data = postObject.data;
        const post = new this();

        post._subreddit.textContent = `r/${data.subreddit}`;
        post._username.textContent = `u/${data.author}`;
        post._identifier.textContent = 'i';
        post._identifier.setAttribute('data-identifier', data.id);
        post._time.textContent = `• ${formatTimeAgo(data.created_utc)}`;
        post._title.textContent = decodeString(data.title);
        post._tag.textContent = data.link_flair_text;

        let hasMedia = false;
        if (data.is_video) {
            const videoInfo = data.media?.reddit_video;
            if (videoInfo) {
                const video = document.createElement('video');
                const videoLink = videoInfo.fallback_url;
                video.src = videoLink;
                video.controls = false;
                // video.preload = "metadata";
                // video.muted = false;
                // video.volume = 0.5;
                video.addEventListener('click', () => {
                    if (video.paused) video.play();
                    else video.pause();
                })
                post._mediaContainer.appendChild(video);
                hasMedia = true;
            }
        } else if (data.preview?.images?.[0]) {
            const imageInfo = data.preview.images[0];
            if (imageInfo) {
                const img = document.createElement('img');
                const imageUrl = imageInfo.resolutions?.[imageInfo.resolutions.length - 1]?.url || imageInfo.source?.url;
                if (imageUrl) {
                    img.src = decodeString(imageUrl);
                    img.alt = data.title || 'Missing image';
                    post._mediaContainer.appendChild(img);
                    hasMedia = true;
                }
            }
        }

        if (!hasMedia) post._mediaContainer.remove();

        post._text.textContent = decodeString(data.selftext);
        post._comments.textContent = `${data.num_comments} comments`;
        post._upvotes.textContent = `${data.ups} upvotes`;
        post._hotness.textContent = `${data.score} hotness`;

        return post;


    }
}

// * ======================================================
// * Custom Element Registration
// * ======================================================

customElements.define('reddit-post', RedditPost);