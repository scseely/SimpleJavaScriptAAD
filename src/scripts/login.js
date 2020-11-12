const AAD_TOKEN = "id_token";
const MARKETPLACE_TOKEN = "token";
const MARKETPLACE_TOKEN_STORAGE = "az_marketplace_token";

aadConfig = {
    clientId : '<your Application (client) id from AAD>',
    tenant: 'common',
    scope: 'openid+profile+email'

};

function displayJwtInfo(jwtToken){
    // TODO: make this "your own"
    $("h1").text(jwtToken.name);
    $("#tenantId").text(jwtToken.tid);
    $("#email").text(jwtToken.preferred_username);
    $("#objectId").text(jwtToken.oid);
}

function constructLoginUrl(){
    let loginUrl = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
        'client_id=' + encodeURIComponent(aadConfig.clientId) +
        '&response_type=id_token' +
        '&redirect_uri=' + window.location.href +
        '&response_mode=fragment' +
        '&scope=' + aadConfig.scope +
        '&nonce=' + (Math.floor(Math.random*10000000));
    return loginUrl;
}

$(
  function(){
      let pageUrl = new URL(window.location.href);
      let hashString = '?' + pageUrl.hash.substr(1);
      let hashParams = new URLSearchParams(hashString);
      if (hashParams.has('error')){
          alert(hashParams.get('error'));
      }
      else if (hashParams.has(AAD_TOKEN)) {
          let jwtInfo = hashParams.get(AAD_TOKEN);
          let jwtToken = jwt_decode(jwtInfo);
          displayJwtInfo(jwtToken);
      } else {
          window.location.href = constructLoginUrl();
      }
  }
);

