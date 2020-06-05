const AAD_TOKEN = "id_token";
const MARKETPLACE_TOKEN = "token";
const MARKETPLACE_TOKEN_STORAGE = "az_marketplace_token";
window.AdalContext = new AuthenticationContext({
    clientId : '<your client id here>'
});

function displayJwtInfo(jwtToken){
    // TODO: make this "your own"
    $("h1").text(jwtToken.name);
    $("#tenantId").text(jwtToken.tid);
    $("#email").text(jwtToken.upn);
}

function displayMarketplaceInfo(marketplaceToken){
    $("#marketplaceToken").text(marketplaceToken);

    // TODO: resolve the marketplace token, probably via a backend
}

$(
  function(){
      let pageUrl = new URL(window.location.href);
      let hashString = '?' + pageUrl.hash.substr(1);
      let hashParams = new URLSearchParams(hashString);
      if (hashParams.has(AAD_TOKEN)) {
          let marketplaceToken = localStorage.getItem(MARKETPLACE_TOKEN_STORAGE);
          let jwtInfo = hashParams.get(AAD_TOKEN);
          let jwtToken = jwt_decode(jwtInfo);
          displayJwtInfo(jwtToken);
          displayMarketplaceInfo(marketplaceToken);
      } else if (pageUrl.searchParams.has(MARKETPLACE_TOKEN)){
          let marketplaceToken = pageUrl.searchParams.get(MARKETPLACE_TOKEN);
          localStorage.setItem(MARKETPLACE_TOKEN_STORAGE, marketplaceToken);
          AdalContext.login();
      }
  }
);