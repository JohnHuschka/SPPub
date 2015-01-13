Profile page that consumes cross-domain data layer and displays retrieved information.
John Huschka, Coldwater Software
January 8, 2015

This is a standard SharePoint 2013 sandboxed solution, deployed as two features:
1.  DataProxyScripts:  The library that will contain solution JavaScript scripts.
2.  ProfileModules:  The profile page and the scripts that go in the script library.

This solution accompanies a seperate solution, ProxyPage.  This solution should be 
deployed second.  (ProfileWithCredentials is dependent on objects in ProxyPage.)

This solution has been tested with SharePoint 2013, on premise.  The core techniques
are designed to be compatible with SharePoint 2010, 2013, and Office 365.

Before deploying:
1.  Take a copy of the existing Profile.aspx page within the site to which you are deploying. 
     Solution will overwrite ("ghost") the page.
2.  Edit the ProfileWithCredentials project properties to reflect the SharePoint site/web to which 
     you want to deploy.
