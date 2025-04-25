export const base_api = 'http://api.gashtemoon.it/';
// export const base_api = "https://api.baloottravel.ir/";

export const API = {
  BASE_URL: "http://api.gashtemoon.it/",
  // BASE_URL: "https://api.baloottravel.ir/",
  Authentication: {
    SIGNIN: `${base_api}app/signin`,
    Login: `${base_api}app/signin`,
    Register: `${base_api}app/signup`,
  },

  Site: {
    SiteInfo: `${base_api}app/`,
    SaveSite: `${base_api}admin/website/update-website-info`,
  },

  User: {
    Register: `${base_api}app/signup`,
    Edit: `${base_api}user/edit-user`,
    UsersList: `${base_api}admin/users`,
    DeleteUser: `${base_api}admin/users/delete-user`,
    userInfo: `${base_api}user/userInfo`,
    ToggleActivity: `${base_api}admin/toggleActivity`,
    ChangeRole: `${base_api}admin/change-role`,
  },

  App: {
    Upload: `${base_api}app/upload`,
    AttrTypeList: `${base_api}app/attraction-type-list`,
    GetSite: `${base_api}app/`,
  },

  Admin: {
    ChangeRoleRequests: `${base_api}admin/all-change-role-requests`,
    AcceptRoleRequests: `${base_api}admin/change-role`,
    DenyRoleRequests: `${base_api}admin/deny-change-role`,
    Edit: `${base_api}admin/edit-user`,
  },

 
};
