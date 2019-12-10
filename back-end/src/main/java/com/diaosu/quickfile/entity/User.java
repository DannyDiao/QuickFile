package com.diaosu.quickfile.entity;

/**
 * Created By Diao Su
 * Date 2019/12/10
 */
public class User {

    private String UserID;
    private String OpenID;
    private String UserName;
    private String AvatarUrl;

    public String generateString(){
        return UserID + OpenID + UserName + AvatarUrl;
    }

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        UserID = userID;
    }

    public String getOpenID() {
        return OpenID;
    }

    public void setOpenID(String openID) {
        OpenID = openID;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getAvatarUrl() {
        return AvatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        AvatarUrl = avatarUrl;
    }



}
