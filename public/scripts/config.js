var app=angular.module('authApp');
app.service('Config',function(){
  this.url="https://oauth.voltuswave.com/"
});
/*
app.config(function(socialProvider){
    // socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    // socialProvider.setLinkedInKey("YOUR LINKEDIN CLIENT ID");
    socialProvider.setFbKey({appId: "212390719297592", apiVersion: "v2.10"});
    // socialProvider.setFbKey({appId: "477514545964493", apiVersion: "v2.10"});
});*/
