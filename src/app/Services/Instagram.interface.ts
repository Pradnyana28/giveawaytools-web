export interface ILike {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  is_private: boolean;
  is_verified: boolean;
  followed_by_viewer: boolean;
  requested_by_viewer: boolean;
  reel?: {
    id: string;
    expiring_at: number;
    has_pride_media: boolean;
    latest_reel_media: any;
    seen: any;
    owner: {
      __typename: string;
      id: string;
      profile_pic_url: string;
      username: string;
    }
  }
}

export interface IComment {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: {
    id: string;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
  };
  viewer_has_liked: boolean;
  edge_liked_by: {
    count: number;
  };
  is_restricted_pending: boolean;
  edge_threaded_comments: {
    count: number;
    page_info: {
      has_next_page: boolean;
      end_cursor: string | null;
    },
    edges: { node: Omit<IComment, 'edge_threaded_comments'> }[];
  }
}