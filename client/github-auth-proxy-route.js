Router.route('/',{
  template: 'nucleus'
});

Router.route('/login-with-github', {
  template: 'nucleus',
  onAfterAction: function() {
    var subdomain = this.params.query.subdomain,
        serverLoginUrl = subdomain + '/nucleus-github-login'
    ;
    if (!subdomain)
      throw new Meteor.Error('"subdomain" query parameter required');

    $.cookie('nucleus-github-auth-domain', subdomain);
    window.location.href = serverLoginUrl;
  }
});

Router.route('/github-auth', {
  name: 'github-auth',
  template: 'nucleus',
  onAfterAction: function() {
    if (this.params.query.subdomain) {
      this.redirect('/login-with-github?subdomain='+this.params.query.subdomain);
    }

    var queryString = window.location.href.split('?')[1],
        subdomain = $.cookie('nucleus-github-auth-domain'),
        callbackUri = subdomain + '/nucleus-github-callback?' + queryString ;

    $.cookie('nucleus-github-auth-domain', null); //let's reset this cookie
    window.location.href = callbackUri;
  }
});
