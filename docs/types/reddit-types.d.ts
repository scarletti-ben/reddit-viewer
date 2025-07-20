/**
 * Raw Reddit post object
 */
type postObject = {

    kind: string;
    data: {
        approved_at_utc: number | null;
        subreddit: string;
        selftext: string;
        author_fullname: string;
        saved: boolean;
        mod_reason_title: string | null;
        gilded: number;
        clicked: boolean;
        is_gallery?: boolean;
        title: string;
        link_flair_richtext: Array<{ e: string, t: string }>;
        subreddit_name_prefixed: string;
        hidden: boolean;
        pwls: number;
        link_flair_css_class: string;
        downs: number;
        thumbnail_height: number | null;
        top_awarded_type: string | null;
        hide_score: boolean;
        media_metadata?: {
            [key: string]: {
                status: string;
                e: string;
                m: string;
                p: Array<{ x: number; y: number; u: string }>;
                s: { x: number; y: number; u: string };
                id: string;
            };
        };
        name: string;
        quarantine: boolean;
        link_flair_text_color: string;
        upvote_ratio: number;
        author_flair_background_color: string | null;
        ups: number;
        domain: string;
        media_embed: object;
        thumbnail_width: number | null;
        author_flair_template_id: string | null;
        is_original_content: boolean;
        user_reports: Array<any>;
        secure_media: object | null;
        is_reddit_media_domain: boolean;
        is_meta: boolean;
        category: string | null;
        secure_media_embed: object;
        gallery_data?: {
            items: Array<{ media_id: string; id: number }>;
        };
        link_flair_text: string;
        can_mod_post: boolean;
        score: number;
        approved_by: string | null;
        is_created_from_ads_ui: boolean;
        author_premium: boolean;
        thumbnail: string;
        edited: boolean | number;
        author_flair_css_class: string | null;
        author_flair_richtext: Array<any>;
        gildings: object;
        post_hint?: string;
        content_categories: Array<string> | null;
        is_self: boolean;
        subreddit_type: string;
        created: number;
        link_flair_type: string;
        wls: number;
        removed_by_category: string | null;
        banned_by: string | null;
        author_flair_type: string;
        total_awards_received: number;
        allow_live_comments: boolean;
        selftext_html: string | null;
        likes: boolean | null;
        suggested_sort: string | null;
        banned_at_utc: number | null;
        url_overridden_by_dest?: string;
        view_count: number | null;
        archived: boolean;
        no_follow: boolean;
        is_crosspostable: boolean;
        pinned: boolean;
        over_18: boolean;
        preview?: {
            images: Array<{
                source: { url: string, width: number, height: number };
                resolutions: Array<{ url: string, width: number, height: number }>;
            }>;
        };
        all_awardings: Array<any>;
        awarders: Array<any>;
        media_only: boolean;
        link_flair_template_id: string;
        can_gild: boolean;
        spoiler: boolean;
        locked: boolean;
        author_flair_text: string | null;
        treatment_tags: Array<any>;
        visited: boolean;
        removed_by: string | null;
        mod_note: string | null;
        distinguished: string | null;
        subreddit_id: string;
        author_is_blocked: boolean;
        mod_reason_by: string | null;
        num_reports: number | null;
        removal_reason: string | null;
        link_flair_background_color: string;
        id: string;
        is_robot_indexable: boolean;
        report_reasons: Array<string> | null;
        author: string;
        discussion_type: string | null;
        num_comments: number;
        send_replies: boolean;
        contest_mode: boolean;
        mod_reports: Array<any>;
        author_patreon_flair: boolean;
        author_flair_text_color: string | null;
        permalink: string;
        stickied: boolean;
        url: string;
        subreddit_subscribers: number;
        created_utc: number;
        num_crossposts: number;
        media: {
            reddit_video?: {
                fallback_url: string;
                hls_url: string;
                duration: number;
                width: number;
                height: number;
                is_gif: boolean;
            };
            oembed?: {
                html: string;
                thumbnail_url: string;
                title: string;
                provider_name: string;
            };
        } | null;
        is_video: boolean;
    };

};

/**
 * Raw Reddit response object
 */
type responseObject = {
    kind: string;
    data: {
        after: string | null;
        dist: number;
        modhash: string;
        geo_filter: string | null;
        children?: postObject[];
        before: string | null;
    };
}