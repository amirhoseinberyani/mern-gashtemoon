
// export const base_api = process.env.REACT_APP_BASE_API;

export const base_api = "http://backend:8080/api/";

const API = {
  // BASE_URL: "https://api.baloottravel.ir/",
  BASE_URL: "http://backend:8080/api/",

  Authentication: {
    Login: `${base_api}app/signin`,
    Register: `${base_api}app/signup`,
    userInfo: `${base_api}user/userInfo`,
    leaderFeatureInfo: `${base_api}user/leaderInfo`,
    FollowUser: `${base_api}user/follow-user`,
    EditUser: `${base_api}user/edit-user`,
    EditLeaderInfo: `${base_api}user/edit-leader`,
    UnfollowUser: `${base_api}user/unfollow-user`,
    ChangeRole: `${base_api}user/change-role`,
    GetMyChangeRoleReq: `${base_api}user/get-my-change-role-request`,
    GetMyFollowers: `${base_api}user/my-followers`,
    GetMyFollowings: `${base_api}user/my-followings`,
    GetMyPosts: `${base_api}user/my-posts`,
    GetMySaves: `${base_api}user/my-saves`,
    GetMyFavorites: `${base_api}user/my-favorites`,
    GetMyVisiteds: `${base_api}user/my-visiteds`,
    GetMyWishVisits: `${base_api}user/my-wish-visits`,
  },

 


  Location: {
    Provinces: `${base_api}app/provinces`,
    Counties: `${base_api}app/counties`,
  },

  Attraction: {
    Attractions: `${base_api}app/attractions`,
    AttractionPosts: `${base_api}app/attraction-posts`,
    AttractionDetail: `${base_api}user/attraction-detail`,
    AppAttractionComments: `${base_api}app/attraction-comments`,
    UserAttractionComments: `${base_api}user/attraction-comments`,
    CommentAttraction: `${base_api}user/comment-attraction`,
    AttractionInfo: `${base_api}app/attraction-info`,
    AttractionFilters: `${base_api}app/attraction-filters`,
    TopAttractions: `${base_api}app/top-attractions`,
    MapBrief: `${base_api}app/map-brief`,
    AttractionTypeList: `${base_api}app/attraction-type-list`,
    FavoriteAttraction: `${base_api}user/favorite-attraction`,
    UnfavoriteAttraction: `${base_api}user/unfavorite-attraction`,
    PlanAttraction: `${base_api}user/plan-attraction`,
  },

  Site: {
    SiteInfo: `${base_api}app/`,
    StatisticInfo: `${base_api}app/get-statistics`,
  },

  Leader: {
    bestLeaders: `${base_api}app/best-leaders`,
  },

  Post: {
    AttractionPosts: `${base_api}app/post/attraction-posts`,
    UserPostInfo: `${base_api}user/post/post-info`,
    AppPostInfo: `${base_api}app/post/post-info`,
    RegisterComment: `${base_api}user/comment`,
    LatestPosts: `${base_api}app/post/latest-posts`,
    LikePost: `${base_api}user/post/like-post`,
    UnlikePost: `${base_api}user/post/unlike-post`,
    SavePost: `${base_api}user/post/save-post`,
    UnsavePost: `${base_api}user/post/unsave-post`,
    AllPosts: `${base_api}app/post/all-posts`,
    TopTags: `${base_api}app/post/top-tags`,
    MyPosts: `${base_api}user/post/my-posts`,
    DeletePost: `${base_api}user/post/delete`,
    GetOnePost: `${base_api}app/post/post-info`,
    AddEditPost: `${base_api}user/post/add-edit`,
    MyFollowingPosts: `${base_api}user/post/following`,
  },

  Dynasty: {
    Dystanies: `${base_api}app/dynasties`,
  },

  Upload: {
    UploadPost: `${base_api}user/post/upload-post`,
  },

  App: {
    Upload: {
      UserProfile: `${base_api}app/upload-user-profile`,
    },
    userInfo: `${base_api}app/userInfo`,
    Leaders: `${base_api}app/leaders`,
    ManagedCities: `${base_api}app/managed-cities`,
  },
}

export default API
